import { UserSettingsEntity } from './userSettings';

export interface AddUserEntity extends Omit<SimpleUser, 'id'> {
  id?: string;
}

export interface SimpleUser {
  email: string;
  name: string;
  lastName: string;
  password: string | null;
  settings: string | null;
  token: string | null;
}

export interface UserEntity extends SimpleUser {
  id: string;
}

export type PayloadUser = Omit<UserEntity, 'lastName' | 'password' | 'settings' | 'token'>;

export type LoginResponse = {
  accessToken: string;
  name: string;
  lastname: string;
  settings: UserSettingsEntity;
};

export type RegisterResponse = {
  emial: string;
  message: string;
};
