import { Router } from 'express';
import { RequestTokenData } from '../middleware/authMiddle';
import { UserRecord } from '../records/user.record';
import { SimpleUser } from '../types';

export const userRouters = Router()
  .get('/', async (req: RequestTokenData, res) => {
    const { id } = req.user;

    const user = await UserRecord.getOne(id);

    res.json(user.settings);
  })

  .put('/', async (req: RequestTokenData, res) => {
    const { id } = req.user;
    const { settings } = req.body as SimpleUser;

    const user = await UserRecord.getOne(id);

    if (settings) {
      user.settings = {
        ...user.settings,
        ...settings,
      };
    }

    await new UserRecord(user).update();

    res.json({ response: 'ok' });
  });
