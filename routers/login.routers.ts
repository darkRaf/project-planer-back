import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { UserRecord } from '../records/user.record';
import { ValidationError } from '../utils/errors';
import { createTokens } from '../utils/createTokens';

type UserLoginData = {
  email: string;
  password: string;
};

export const loginRouters = Router().post('/', async (req, res) => {
  const frontData = req.body as UserLoginData;
  if (!frontData?.email || !frontData?.password) throw new ValidationError(401, 'Niepoprawny login lub hasło.');

  const { email: frontEmail, password: frontPass } = frontData;

  const user = await UserRecord.getByEmail(frontEmail);
  if (!user) throw new ValidationError(401, 'Podany email nie istnieje.');

  const access = await bcrypt.compare(frontPass, user.password);
  if (!access) throw new ValidationError(401, 'Niepoprawne hasło.');

  const { accessToken, refreshToken } = createTokens(user);

  await UserRecord.setToken(user.id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});
