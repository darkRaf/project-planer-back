import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRecord } from '../records/user.record';
import { ValidationError } from '../utils/errors';

type UserLoginData = {
  email: string;
  password: string;
};

const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

export const loginRouters = Router().post('/', async (req, res) => {
  const frontData = req.body as UserLoginData;
  if (!frontData?.email || !frontData?.password) throw new ValidationError(401, 'Niepoprawny login lub hasło');

  const { email: frontEmail, password: frontPass } = frontData;

  const user = await UserRecord.getByEmail(frontEmail);
  if (!user) throw new ValidationError(401, 'Niepoprawny login lub hasło');

  const { id, name, email, password } = user;

  const access = await bcrypt.compare(frontPass, password);
  if (!access) throw new ValidationError(401, 'Niepoprawny login lub hasło');

  const payload = { id, email, name };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN);

  await UserRecord.setToken(id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});
