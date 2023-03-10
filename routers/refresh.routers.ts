import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserRecord } from '../records/user.record';
import { PayloadUser } from '../types';
import { TokenError } from '../utils/errors';

const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

export const refreshRouters = Router().get('/', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;

  if (!refreshToken) throw new TokenError(401, 'Nieautoryzowany dostęp.');

  const isToken = await UserRecord.isSetToken(refreshToken);
  if (!isToken) throw new TokenError(403, 'Dostęp zabrioniony');

  jwt.verify(refreshToken, REFRESH_TOKEN, async (err, data: PayloadUser) => {
    if (err) throw new TokenError(403, 'Dostęp zabrioniony');

    const payload = {
      id: data.id,
      emial: data.email,
      name: data.name,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });

    res.json({ accessToken });
  });
});
