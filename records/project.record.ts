import { NewProjectEntity, ProjectEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';

type ProjectRecordResults = [ProjectRecord[], FieldPacket[]];

export class ProjectRecord implements ProjectEntity {
  id: string;
  title: string;
  userId: string;
  cardsId: string[];
  settings: string;

  constructor(obj: NewProjectEntity) {
    if (obj.title.length < 3 || obj.title.length > 50) {
      throw new ValidationError(400, 'Nazwa nowego projektu musi zawierać od 3 do 50 znaków.');
    }

    if (obj.cardsId.length > 49) {
      throw new ValidationError(400, 'Przekroczono maksymalną ilość 50-ciu zadań w karcie.');
    }

    if (obj.settings.length > 500) {
      throw new ValidationError(400, 'Błąd zapisu ustawień projektu.');
    }

    this.id = obj.id;
    this.userId = obj.userId;
    this.title = obj.title;
    this.cardsId = obj.cardsId;
    this.settings = obj.settings;
  }

  static async getOne(id: string): Promise<ProjectRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM projects` WHERE `id` = :id', {
      id,
    })) as ProjectRecordResults;

    return results.length === 0 ? null : new ProjectRecord(results[0]);
  }

  static async getAll(id: string): Promise<ProjectRecord[]> {
    const [results] = (await pool.execute('SELECT * FROM `projects` WHERE `userId` = :id', {
      id,
    })) as ProjectRecordResults;

    return results.length ? null : results.map((result) => new ProjectRecord({ ...result }));
  }

  async save(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      } else {
        throw new ValidationError(400, 'Projekt już istnieje w bazie.');
      }

      await pool.execute(
        'INSERT INTO `projects`(`id`, `title`, `userId`, `cardsId`, `settings`) VALUES (id, :title, :userId, :cardsId, :settings)',
        this,
      );

      return this.id;
    } catch (err) {
      throw new Error(err);
    }
  }
}
