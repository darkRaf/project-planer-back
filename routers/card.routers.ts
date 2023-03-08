import { Router } from 'express';

export const cardRoters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ getCardId: id });
  })

  .post('/', async (req, res) => {
    const body = req.body;
    body.postCardAdded = 'added';

    res.json(body);
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ deleteCard: id });
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putCard: id, ...body });
  });
