import { Router } from 'express';
import { CardRecord } from '../records/card.record';
import { TaskRecord } from '../records/task.record';
import { TaskEntity, TaskRequest } from '../types';

export const taskRouters = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;

    res.json(await TaskRecord.getOne(id));
  })

  .post('/', async (req, res) => {
    const { title, cardId } = req.body as TaskRequest;
    const task = {
      title,
      labels: [],
      body: { checkList: [], deadline: '', description: '' },
      addedAt: '',
      cardId: cardId,
    } as TaskEntity;

    const newCard = new TaskRecord(task);
    await newCard.save();

    const card = await CardRecord.getOne(cardId);
    card.tasksId.push(newCard.id);
    await card.update();

    res.json(newCard);
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
