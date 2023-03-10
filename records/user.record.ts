import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { AddUserEntity, UserEntity } from '../types';
import { v4 as uuid } from 'uuid';

type UserdResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  id: string;
  email: string;
  name: string;
  lastName: string;
  password: string;
  settings: string;
  token: string;

  constructor(obj: AddUserEntity) {
    //TODO: dodać walidację

    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.lastName = obj.lastName;
    this.password = obj.password;
    this.settings = obj.settings;
    this.token = obj.token;
  }

  static async getOne(id: string): Promise<UserEntity | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    })) as UserdResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getByEmail(email: string): Promise<UserEntity | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
      email,
    })) as UserdResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async isSetToken(token: string): Promise<boolean | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `token` = :token', {
      token,
    })) as UserdResults;

    return !!results.length;
  }

  static async setToken(id: string, token: string): Promise<void> {
    await pool.execute('UPDATE `users` SET `token` = :token WHERE `users`.`id` = :id', {
      id,
      token,
    });
  }

  static async setPassword(id: string, pass: string): Promise<void> {
    await pool.execute('UPDATE `users` SET `password` = :pass WHERE `users`.`id` = :id', {
      id,
      pass,
    });
  }

  async save(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      } else {
        //TODO: wygenerowć błąd 'Produkt już jest w bazie'
      }

      console.log(this);

      await pool.execute(
        'INSERT INTO `users`(`id`, `email`, `name`, `lastName`, `password`, `settings`, `token`) VALUES (:id, :email, :name, :lastName, :password, :settings, :token)',
        this,
      );

      return this.id;
    } catch (err) {
      console.log(err.message);

      //TODO: przechwicic bład i wygenerować przyjazny dla usera
      throw new Error('Error save data.');
    }
  }
}
