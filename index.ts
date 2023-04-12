import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerRouters } from './routers/register.routers';
import { loginRouters } from './routers/login.routers';
import { logoutRouters } from './routers/logout.routers';
import { refreshRouters } from './routers/refresh.routers';
import { authMiddle } from './middleware/authMiddle';
import { userRouters } from './routers/user.routers';
import { projectRouters } from './routers/project.routers';
import { cardRouters } from './routers/card.routers';
import { taskRouters } from './routers/task.routers';
import { errorHandler } from './utils/errors';
import { weatherRouters } from './routers/weather.routers';

const PORT = process.env.PORT || 3001;

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(json());

app.use('/api/register', registerRouters);
app.use('/api/login', loginRouters);
app.use('/api/logout', logoutRouters);
app.use('/api/refresh-token', refreshRouters);
app.use(authMiddle);
app.use('/api/user', userRouters);
app.use('/api/project', projectRouters);
app.use('/api/card', cardRouters);
app.use('/api/task', taskRouters);
app.use('/api/weather', weatherRouters);
app.use('*', (req, res) => res.status(404).send('Not Found'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
