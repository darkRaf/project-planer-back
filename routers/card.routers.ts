import { Router } from 'express';
import { CardRecord } from '../records/card.record';
import { ProjectRecord } from '../records/project.record';
import { CardRequest, CardResponse, NewCardEntity } from '../types';

export const cardRouters = Router()
  .get('/:id', async (req, res) => {
    const searchId = req.params.id;

    const { cardsId } = await ProjectRecord.getOne(searchId);
    const cards = (await CardRecord.getCardsData(cardsId)) as CardResponse[];

    res.json(cards);
  })

  .post('/', async (req, res) => {
    const { title, projectId } = req.body as CardRequest;
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

  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    res.json({ putCard: id, ...body });
  });
