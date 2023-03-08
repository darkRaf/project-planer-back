import { Router } from 'express';

export const projectRoters = Router()
  .get('/', async (req, res) => {
    res.json({ getProjects: 'all' });
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ getProjectId: id });
  })

  .post('/', async (req, res) => {
    const body = req.body;
    body.postProjectAdded = 'added';

    res.json(body);
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ deleteProject: id });
  })

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putProject: id, ...body });
  });
