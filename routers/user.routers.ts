import { Router } from 'express';

export const userRoters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ getUserId: id });
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
