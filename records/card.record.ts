import { CardEntity, NewCardEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { ValidationError } from '../utils/errors';

type CardRecordResults = [CardRecord[], FieldPacket[]];

export class CardRecord implements CardEntity {
  id: string;
  title: string;
  projectId: string;
  tasksId: string[];

  constructor(obj: NewCardEntity) {
    const allTasks = typeof obj.tasksId === 'string' ? JSON.parse(obj.tasksId) : obj.tasksId;

    if (obj.title.length < 3 || obj.title.length > 50) {
      throw new ValidationError(400, 'Nazwa nowego projektu musi zawierać od 3 do 50 znaków.');
    }

    if (allTasks.length > 50) {
      throw new ValidationError(400, 'Przekroczono maksymalną ilość 50-ciu zadań w karcie.');
    }

    this.id = obj.id;
    this.title = obj.title;
    this.projectId = obj.projectId;
    this.tasksId = allTasks;
  }

  static async getOne(id: string): Promise<CardRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `cards` WHERE `id` = :id', {
      id,
    })) as CardRecordResults;

    return results.length === 0 ? null : new CardRecord(results[0]);
  }

  static async getCardsData(id: string[]): Promise<CardEntity[]> {
    let query = 'SELECT * FROM `cards` WHERE `id` IN ("';
    query += id.join('","');
    query += '")';

    const [results] = (await pool.execute(query)) as CardRecordResults;

    if (results.length) {
      const sortedCards = id.map((i) => {
        const card = results.find((result) => result.id === i);
        return new CardRecord(card);
      });

      return sortedCards;
    }

    return [];
  }

  async save(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      } else {
        throw new ValidationError(400, 'Projekt już istnieje w bazie.');
      }

      await pool.execute(
        'INSERT INTO `cards`(`id`, `title`, `projectId`, `tasksId`) VALUES (:id, :title, :projectId, :tasksId)',
        this,
      );

      return this.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `cards` SET `title`=:title,`projectId`=:projectId,`tasksId`=:tasksId WHERE `id`=:id',
      this,
    );
  }

  static async deleteMore(idArr: string[]): Promise<void> {
    if (!idArr.length) return;

    let query = 'DELETE FROM `cards` WHERE `cards`.`id` IN ("';
    query += idArr.join('","');
    query += '")';

    await pool.execute(query);
  }
}
