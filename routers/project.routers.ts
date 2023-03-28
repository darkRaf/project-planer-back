import { Router } from 'express';
import { RequestTokenData } from '../middleware/authMiddle';
import { ProjectRecord } from '../records/project.record';

export const projectRouters = Router()
  .get('/', async (req: RequestTokenData, res) => {
    const { id } = req.user;

    res.json(await ProjectRecord.getAll(id));
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;

    const projectData = await ProjectRecord.getOne(id);

    res.json(projectData);
  })

  .post('/', async (req, res) => {
    const newProject = new ProjectRecord({ ...(req.body as ProjectRecord) });

    const id = await newProject.save();

    res.json({ id });
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
