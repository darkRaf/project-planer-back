import { Router } from 'express';
import { UserRecord } from '../records/user.record';

export const userRoters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await UserRecord.getOne(id);

    res.json(user);
  })

  .post('/', async (req, res) => {
    const body = req.body;
    body.postUserAdded = 'added';

    res.json(body);
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putUser: id, ...body });
  });
