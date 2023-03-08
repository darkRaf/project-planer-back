import { Router } from 'express';

export const taskRoters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ getTaskId: id });
  })

  .post('/', async (req, res) => {
    const body = req.body;
    body.postTaskAdded = 'added';

    res.json(body);
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ deleteTask: id });
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putTask: id, ...body });
  });
