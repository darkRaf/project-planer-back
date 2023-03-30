import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import { UserRecord } from '../records/user.record';
import { ValidationError, ValidationRegisterError } from '../utils/errors';
import { defaultUserSettings } from '../types';

type RegisterReq = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerRouters = Router().post('/', async (req: Request, res: Response) => {
  const { name, lastName, email, password, confirmPassword } = req.body as RegisterReq;

  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  const test = password.match(regx);

  if (!test) {
    throw new ValidationRegisterError(400, [
      {
        name: 'password',
        message:
          'Pole `Hasło` musi zawierać od 8 do 20 znaków. Hasło powinno mieć małe i wielkie litery oraz cyfry i znaki specjalne.',
      },
    ]);
  }
  if (password !== confirmPassword) throw new ValidationError(400, 'Podane hasła muszą być takie same.');

  const hashPass = bcrypt.hashSync(password, 14);

  const newUser = new UserRecord({
    name,
    lastName,
    email,
    password: hashPass,
    settings: defaultUserSettings,
    token: null,
  });

  await newUser.save();

  res.status(200).json({ message: 'Sukces.', email });
});
