import { NewProjectEntity, ProjectEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';

type ProjectRecordResults = [ProjectRecord[], FieldPacket[]];

export class ProjectRecord implements ProjectEntity {
  id: string;
  title: string;
  userId: string;
  cardsId: string[];

  constructor(obj: NewProjectEntity) {
    this.id = obj.id;
    this.userId = obj.userId;
    this.title = obj.title;
    this.cardsId = obj.cardsId;
  }

  static async getOne(id: string): Promise<ProjectRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `projects` WHERE `id` = :id', {
      id,
    })) as ProjectRecordResults;

    return results.length === 0 ? null : new ProjectRecord(results[0]);
  }
}
