import { TaskBodyEntity } from './taskBodyEntity';

// export enum Priorities {
//   High = 'high',
//   Medium = 'medium',
//   Low = 'low',
//   Undefined = 'undefined'
// }

export type Priorities = 'high' | 'medium' | 'low' | 'undefined';

export interface NewTaskdEntity {
  title: string;
  cardId: string;
}

export interface TaskEntity {
  id?: string;
  title: string;
  labels: Priorities[];
  addedAt: string | null;
  body: TaskBodyEntity;
}

export interface TaskRequest {
  title: string;
  cardId: string;
}
