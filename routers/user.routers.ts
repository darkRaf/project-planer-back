import { Router } from 'express';
import { UserRecord } from '../records/user.record';

export const userRouters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await UserRecord.getOne(id);

    res.json(user);
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putUser: id, ...body });
  });
