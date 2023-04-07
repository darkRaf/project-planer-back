import { Request, Router } from 'express';
import { CardRecord } from '../records/card.record';
import { ProjectRecord } from '../records/project.record';
import { CardEntity, CardResponse, NewCardEntity } from '../types';

type RequestCard = Request & Partial<CardEntity>;

export const cardRouters = Router()
  .get('/:id', async (req, res) => {
    const searchId = req.params.id;

    const { cardsId } = await ProjectRecord.getOne(searchId);
    const cards = (await CardRecord.getCardsData(cardsId)) as CardResponse[];

    res.json(cards);
  })

  .post('/', async (req: RequestCard, res) => {
    const { title, projectId } = req.body;
    const card = {
      title,
      tasksId: [],
      projectId,
    } as NewCardEntity;

    const newCard = new CardRecord(card);
    await newCard.save();

    const project = await ProjectRecord.getOne(projectId);
    project.cardsId.push(newCard.id);
    await project.update();

    res.json(newCard);
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;

    res.json({ deleteCard: id });
  })

  .put('/:id', async (req: RequestCard, res) => {
    const id = req.params.id;

    const oldCard = await CardRecord.getOne(id);

    if (req.body.title) oldCard.title = req.body.title;
    if (req.body.projectId) oldCard.projectId = req.body.projectId;
    if (req.body.tasksId) oldCard.tasksId = req.body.tasksId;

    await new CardRecord(oldCard).update();

    res.json({ status: 'ok' });
  });
