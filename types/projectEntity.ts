import { CardEntity } from './cardEntity';

export interface NewProjectEntity extends Omit<ProjectEntity, 'id'> {
  id?: string;
}
export interface ProjectEntity {
  id: string;
  title: string;
  userId: string;
  cardsId: string[];
}

export interface ProjectResponseData extends ProjectEntity {
  cards: CardEntity[];
}
