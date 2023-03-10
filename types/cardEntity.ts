import { TaskEntity } from './taskEntyti';

export interface CardEntity {
  id: string;
  title: string;
  tasksId: string[];
}

export interface CardResponse extends CardEntity {
  tasks: TaskEntity[];
}
