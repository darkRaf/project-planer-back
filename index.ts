import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import 'express-async-errors';
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
import { bodyRoters } from './routers/body.routers';
import { errorHandler } from './utils/errors';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(json());

app.use('/register', registerRouters);
app.use('/login', loginRouters);
app.use('/logout', logoutRouters);
app.use('/refresh-token', refreshRouters);
app.use(authMiddle);
app.use('/user', userRouters);
app.use('/project', projectRouters);
app.use('/card', cardRouters);
app.use('/task', taskRouters);
app.use('/body', bodyRoters);
app.use('*', (req, res) => res.status(404).send('Not Found'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
