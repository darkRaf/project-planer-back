import { Router } from 'express';
import { UserRecord } from '../records/user.record';

export const logoutRouters = Router().delete('/', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;
  if (!refreshToken) return res.sendStatus(204);

  await UserRecord.removeToken(refreshToken);

  res.clearCookie('refreshToken');
  res.sendStatus(204);
});
