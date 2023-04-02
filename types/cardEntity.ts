import { TaskEntity } from './taskEntity';

export interface NewCardEntity extends Omit<CardEntity, 'id'> {
  id?: string;
  projectId: string;
}

export interface CardEntity {
  id: string;
  title: string;
  tasksId: string[];
}

export interface CardResponse extends CardEntity {
  tasks: TaskEntity[];
}

export interface CardRequest {
  title: string;
  projectId: string;
}
