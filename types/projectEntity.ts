import { CardResponse } from './cardEntity';
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

export interface ProjectEntityResponse {
  id: string;
  userId?: string;
  title: string;
  cardsId: string[];
  cards: CardEntity[];
}

export interface ProjectResponseData extends ProjectEntity {
  cards: CardResponse[];
}
