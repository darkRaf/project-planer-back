import { UserSettingsEntity } from './userSettings';

export interface AddUserEntity extends Omit<SimpleUser, 'id' | 'settings'> {
  id?: string;
  settings: UserSettingsEntity | string;
}

export interface SimpleUser {
  email: string;
  name: string;
  lastName: string;
  password: string | null;
  settings: UserSettingsEntity;
  token: string | null;
}

export interface UserEntity extends SimpleUser {
  id: string;
}

export type PayloadUser = Omit<UserEntity, 'lastName' | 'password' | 'settings' | 'token'>;

export type LoginResponse = Omit<SimpleUser, 'id' | 'token' | 'password'> & {
  accessToken: string;
  id: string;
};

export type RegisterResponse = {
  email: string;
  message: string;
};
