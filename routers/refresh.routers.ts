import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserRecord } from '../records/user.record';
import { userCookieSettings } from '../settings/settings';
import { PayloadUser } from '../types';
import { createTokens } from '../utils/createTokens';
import { TokenError, ValidationError } from '../utils/errors';

const { REFRESH_TOKEN } = process.env;

export const refreshRouters = Router().get('/', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;

  if (!refreshToken) throw new TokenError(401, 'Nieautoryzowany dostęp.');

  const isToken = await UserRecord.isSetToken(refreshToken);
  if (!isToken) throw new TokenError(403, 'Dostęp zabroniony');

  jwt.verify(refreshToken, REFRESH_TOKEN, async (err, data: PayloadUser) => {
    if (err) throw new TokenError(403, 'Dostęp zabroniony');

    const user = await UserRecord.getOne(data.id);
    if (!user) throw new ValidationError(401, 'Podany użytkownik nie istnieje.');

    const { accessToken, refreshToken } = createTokens(user);

    await UserRecord.setToken(data.id, refreshToken);

    res.cookie('refreshToken', refreshToken, userCookieSettings);

    res.json({ accessToken, name: user.name, lastName: user.lastName });
  });
});
