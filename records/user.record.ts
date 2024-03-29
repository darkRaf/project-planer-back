import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { AddUserEntity, ErrorLoginEntity, UserEntity, UserSettingsEntity } from '../types';
import { v4 as uuid } from 'uuid';
import { ValidationError, ValidationRegisterError } from '../utils/errors';

type UserdResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements AddUserEntity {
  id: string;
  email: string;
  name: string;
  lastName: string;
  password: string;
  settings: UserSettingsEntity;
  token: string;

  constructor(obj: AddUserEntity) {
    const errors: ErrorLoginEntity[] = [];

    if (obj.email.length < 8 || obj.email.length > 40) {
      errors.push({
        name: 'email',
        message: 'Pole `Email` musi zawierać od 8 do 40 znaków.',
      });
    }

    if (obj.name.length < 3 || obj.name.length > 40) {
      errors.push({
        name: 'name',
        message: 'Pole `Imię` musi zawierać od 3 do 20 znaków.',
      });
    }

    if (obj.lastName.length < 3 || obj.lastName.length > 40) {
      errors.push({
        name: 'lastName',
        message: 'Pole `Nazwisko` musi zawierać od 3 do 30 znaków.',
      });
    }

    if (errors.length) throw new ValidationRegisterError(400, errors);

    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.lastName = obj.lastName;
    this.password = obj.password;
    this.settings = typeof obj.settings === 'string' ? JSON.parse(obj.settings) : obj.settings;
    this.token = obj.token;
  }

  static async getOne(id: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    })) as UserdResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getByEmail(email: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
      email,
    })) as [UserRecord[], FieldPacket[]];

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async isSetToken(token: string): Promise<boolean | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `token` = :token', {
      token,
    })) as UserdResults;

    return !!results.length;
  }

  static async setToken(id: string, token: string): Promise<void> {
    await pool.execute('UPDATE `users` SET `token` = :token WHERE `id` = :id', { id, token });
  }

  static async removeToken(token: string): Promise<void> {
    await pool.execute('UPDATE `users` SET `token` = NULL WHERE `token` = :token', { token });
  }

  static async setPassword(id: string, pass: string): Promise<void> {
    await pool.execute('UPDATE `users` SET `password` = :pass WHERE `id` = :id', { id, pass });
  }

  async save(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      } else {
        throw new ValidationError(400, 'Nie można zapisać użytkownika w bazie.');
      }

      await pool.execute(
        'INSERT INTO `users`(`id`, `email`, `name`, `lastName`, `password`, `settings`, `token`) VALUES (:id, :email, :name, :lastName, :password, :settings, :token)',
        this,
      );

      return this.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `users` SET `email`=:email,`name`=:name,`lastName`=:lastName,`password`=:password,`settings`=:settings,`token`=:token WHERE `id`=:id',
      this,
    );
  }
}
