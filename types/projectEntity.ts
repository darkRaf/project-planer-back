import { CardResponse } from './cardEntity';
import { CardEntity } from './cardEntity';
export interface NewProjectEntity extends Omit<ProjectEntity, 'id'> {
  id?: string;
}

export type NewProjectBody = Omit<ProjectEntity, 'id' | 'userId' | 'cardsId'>;

export interface ProjectEntity {
  id: string;
  title: string;
  userId: string;
  cardsId: string[];
  background: string;
}

export interface ProjectEntityResponse {
  id: string;
  title: string;
  background: string;
  cardsId: string[];
  cards: CardResponse[];
}

export type OneProjectResponse = Omit<ProjectEntity, 'userId'>;

export type AllProjectsResponse = Omit<ProjectEntity, 'userId' | 'cardsId'>;

export interface ProjectResponseData extends ProjectEntity {
  cards: CardResponse[];
}
