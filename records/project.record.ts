import { AllProjectsResponse, NewProjectEntity, ProjectEntity } from '../types';
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
  background: string;

  constructor(obj: NewProjectEntity) {
    const allCards = typeof obj.cardsId === 'string' ? JSON.parse(obj.cardsId) : obj.cardsId;

    if (obj.title.length < 3 || obj.title.length > 50) {
      throw new ValidationError(400, 'Nazwa nowego projektu musi zawierać od 3 do 50 znaków.');
    }

    if (allCards.length > 10) {
      throw new ValidationError(400, 'Przekroczono maksymalną ilość 10-ciu kart w projekcie.');
    }

    if (obj.background.length > 100) {
      throw new ValidationError(400, 'Nazwa pliku przekracza 100 znaków.');
    }

    this.id = obj.id;
    this.userId = obj.userId;
    this.title = obj.title;
    this.cardsId = allCards;
    this.background = obj.background;
  }

  static async getOne(id: string): Promise<ProjectRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `projects` WHERE `id` = :id', {
      id,
    })) as ProjectRecordResults;

    return results.length === 0 ? null : new ProjectRecord(results[0]);
  }

  static async getAll(id: string): Promise<AllProjectsResponse[]> | null {
    const [results] = (await pool.execute('SELECT * FROM `projects` WHERE `userId` = :id', {
      id,
    })) as ProjectRecordResults;

    if (results.length) {
      return results.map((result) => {
        const { id, title, background } = result;
        return { id, title, background };
      });
    }

    return null;
  }

  async save(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      } else {
        throw new ValidationError(400, 'Projekt już istnieje w bazie.');
      }

      await pool.execute(
        'INSERT INTO `projects`(`id`, `title`, `userId`, `cardsId`, `background`) VALUES (:id, :title, :userId, :cardsId, :background)',
        this,
      );

      return this.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `projects` SET `title`=:title,`userId`=:userId,`cardsId`=:cardsId,`background`=:background WHERE  `id`=:id',
      this,
    );
  }
}
