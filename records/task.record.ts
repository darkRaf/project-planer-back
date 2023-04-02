import { Priorities, TaskBodyEntity, TaskEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { ValidationError } from '../utils/errors';

type TaskRecordResults = [TaskRecord[], FieldPacket[]];

export class TaskRecord implements TaskEntity {
  id: string;
  title: string;
  labels: Priorities;
  addedAt: string | null;
  body: TaskBodyEntity;

  constructor(obj: TaskEntity) {
    const bodyObj = typeof obj.body === 'string' ? JSON.parse(obj.body) : obj.body;

    if (obj.title.length < 3 || obj.title.length > 250) {
      throw new ValidationError(400, 'Nazwa zadnia musi zawierać od 3 do 250 znaków.');
    }

    this.id = obj.id;
    this.title = obj.title;
    this.labels = obj.labels;
    this.addedAt = obj.addedAt;
    this.body = bodyObj;
  }

  static async getOne(id: string): Promise<TaskRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `tasks` WHERE `id` = :id', {
      id,
    })) as TaskRecordResults;

    return results.length === 0 ? null : new TaskRecord(results[0]);
  }

  static async getTaskData(id: string[]): Promise<TaskEntity[]> {
    let query = 'SELECT * FROM `tasks` WHERE `id` IN ("';
    query += id.join('","');
    query += '")';

    const [results] = (await pool.execute(query)) as TaskRecordResults;

    if (results.length) {
      const sortedTask = id.map((i) => {
        const task = results.find((result) => result.id === i);
        return new TaskRecord(task);
      });

      return sortedTask;
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
        'INSERT INTO `tasks`(`id`, `title`, `labels`, `body`, `addedAt`) VALUES (:id, :title, :labels, :body, :addedAt)',
        this,
      );

      return this.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `tasks` SET `title`=:title,`labels`=:labels,`body`=:body,`addedAt`=:addedAt WHERE `id`=:id',
      this,
    );
  }
}
