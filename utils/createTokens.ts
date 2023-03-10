import jwt from 'jsonwebtoken';
import { UserEntity } from '../types';

type AccessTokenEntity = {
  accessToken: string;
  refreshToken: string;
};

export const createTokens = (users: UserEntity): AccessTokenEntity => {
  const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

  const payload = {
    id: users.id,
    email: users.email,
    name: users.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: 7 * 24 * 60 + 'm' });

  return { accessToken, refreshToken };
};
