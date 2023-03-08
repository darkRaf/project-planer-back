import { Router } from 'express';

export const bodyRoters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ getBodyId: id });
  })

  .post('/', async (req, res) => {
    const body = req.body;
    body.postBodyAdded = 'added';

    res.json(body);
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ deleteBody: id });
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putBody: id, ...body });
  });
