import { TaskEntity } from './taskEntyti';

export interface NewCardEntity extends Omit<CardEntity, 'id'> {
  projectId: string;
  id?: string;
}

export interface CardEntity {
  id: string;
  title: string;
  tasksId: string[];
}

export interface CardResponse extends CardEntity {
  tasks: TaskEntity[];
}
