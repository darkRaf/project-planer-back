import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PayloadUser } from '../types';
import { TokenError } from '../utils/errors';

interface RequestTokenData extends Request {
  user: PayloadUser | JwtPayload | string;
}

const { ACCESS_TOKEN } = process.env;

export const authMiddle = (req: RequestTokenData, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) throw new TokenError(401, 'Nieautoryzowany dostęp.');

  jwt.verify(token, ACCESS_TOKEN, (err, data) => {
    if (err) throw new TokenError(403, 'Dostęp zabrioniony');

    req.user = data;
    next();
  });
};