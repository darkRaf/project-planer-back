import { Request, Router } from 'express';
import { CardRecord } from '../records/card.record';
import { TaskRecord } from '../records/task.record';
import { Priorities, TaskEntity, TaskRequest } from '../types';
import { ValidationError } from '../utils/errors';

type RequestTask = Request & Partial<TaskEntity>;

export const taskRouters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json(await TaskRecord.getOne(id));
  })

  .post('/', async (req, res) => {
    const { title, cardId } = req.body as TaskRequest;
    const task = {
      title,
      labels: Priorities.Undefined,
      body: { checkList: [], deadline: '', description: '' },
      addedAt: '',
      cardId,
    } as TaskEntity;

    const newCard = new TaskRecord(task);
    await newCard.save();

    const card = await CardRecord.getOne(cardId);
    card.tasksId.push(newCard.id);
    await card.update();

    res.json(newCard);
  })

  .delete('/:idCard/:idTask', async (req, res) => {
    const { idCard, idTask } = req.params;

    const task = await TaskRecord.getOne(idTask);
    const card = await CardRecord.getOne(idCard);

    if (!task && !card) throw new ValidationError(404, 'Nie odnaleziono karty lub zadania do usunięcia.');

    const index = card.tasksId.indexOf(task.id);
    if (index === -1) throw new ValidationError(404, 'Nie odnaleziono zadania w karcie do usunięcia.');

    card.tasksId.splice(index, 1);
    await card.update();
    await task.delete();

    res.json({ status: 'ok' });
  })

  .put('/:id', async (req: RequestTask, res) => {
    const id = req.params.id;

    const oldTask = await TaskRecord.getOne(id);

    if (req.body.title) oldTask.title = req.body.title;
    if (req.body.labels) oldTask.labels = req.body.labels;
    if (req.body.body) oldTask.body = req.body.body;

    const newTask = new TaskRecord(oldTask);
    await newTask.update();

    res.json({ status: 'ok' });
  });
