import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: 'https://localhost:3001',
  }),
);

app.use(json());

app.use('/', (req, res) => res.send('test'));

app.use('*', (req, res) => res.status(404).send('Not Found'));

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
