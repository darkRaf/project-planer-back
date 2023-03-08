import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { projectRoters } from './routers/project.routers';
import { cardRoters } from './routers/card.routers';
import { taskRoters } from './routers/task.roters';
import { bodyRoters } from './routers/body.routers';
import { userRoters } from './routers/user.routers';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: 'https://localhost:3001',
  }),
);

app.use(json());

app.use('/user', userRoters);
app.use('/project', projectRoters);
app.use('/card', cardRoters);
app.use('/task', taskRoters);
app.use('/body', bodyRoters);
app.use('*', (req, res) => res.status(404).send('Not Found'));

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
