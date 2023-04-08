import { Router } from 'express';
import { RequestTokenData } from '../middleware/authMiddle';
import { CardRecord } from '../records/card.record';
import { ProjectRecord } from '../records/project.record';
import { TaskRecord } from '../records/task.record';
import { UserRecord } from '../records/user.record';
import { CardResponse, ProjectResponseData } from '../types';
import { ValidationError } from '../utils/errors';

export const projectRouters = Router()
  .get('/', async (req: RequestTokenData, res) => {
    const { id } = req.user;

    res.json(await ProjectRecord.getAll(id));
  })

  .get('/:id', async (req, res) => {
    const searchId = req.params.id;

    const { id, title, cardsId, background } = await ProjectRecord.getOne(searchId);
    const cards = (await CardRecord.getCardsData(cardsId)) as CardResponse[];
    for (const card of cards) {
      const tasks = await TaskRecord.getTaskData(card.tasksId);
      card.tasks = tasks;
    }

    const resData: ProjectResponseData = {
      cards,
      id,
      title,
      userId: '',
      cardsId,
      background,
    };

    res.json(resData);
  })

  .post('/', async (req: RequestTokenData, res) => {
    const { id: userId } = req.user;

    const allProjects = await ProjectRecord.getAll(userId);

    if (allProjects !== null && allProjects.length === 10)
      throw new ValidationError(400, 'Przekroczono maksymalną ilości 10-ciu projektów.');

    const projectData = {
      cardsId: [],
      ...req.body,
      userId,
    } as ProjectRecord;

    const newProject = new ProjectRecord({ ...projectData });
    const id = await newProject.save();

    const user = await UserRecord.getOne(userId);
    user.settings.activeIdProject = id;
    await user.update();

    res.json(user.settings);
  })

  .delete('/:id', async (req: RequestTokenData, res) => {
    const { id: userId } = req.user;
    const id = req.params.id;

    const user = await UserRecord.getOne(userId);
    if (!user) throw new ValidationError(400, 'Nie odnaleziono użytkownika.');

    const project = await ProjectRecord.getOne(id);
    const cards = await CardRecord.getCardsData(project.cardsId);

    for (const card of cards) {
      await TaskRecord.deleteMore(card.tasksId);
    }

    await CardRecord.deleteMore(project.cardsId);
    await project.delete();

    const nextProject = await ProjectRecord.getAll(userId);
    if (nextProject) user.settings.activeIdProject = nextProject[0].id;
    if (!nextProject) user.settings.activeIdProject = '';

    await user.update();

    res.json({ status: 'ok' });
  })

  // TODO:
  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putProject: id, ...body });
  });
