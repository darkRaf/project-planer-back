import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import { UserRecord } from '../records/user.record';
import { ValidationError } from '../utils/errors';

type RegisterReq = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerRouters = Router().post('/', async (req: Request, res: Response) => {
  const registerData = req.body as RegisterReq;
  const { name, lastName, email, password, confirmPassword } = registerData;
  //TODO: dodac walidacje danych przy rejestracji.

  if (password !== confirmPassword) throw new ValidationError(400, 'Podane hasła muszą być takie same.');

  const hashPass = bcrypt.hashSync(password, 14);

  const newUser = new UserRecord({
    name,
    lastName,
    email,
    password: hashPass,
    settings: null,
    token: null,
  });

  await newUser.save();

  res.status(200).json({ message: 'Sukces.' });
});
