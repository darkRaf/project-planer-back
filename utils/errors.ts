import { NextFunction, Request, Response } from 'express';
import { ErrorLoginEntity } from '../types';

type HttpStatusCode = 400 | 401 | 403 | 404 | 500;
type Errors = ValidationError | TokenError | ValidationRegisterError;

export class ValidationError extends Error {
  status: HttpStatusCode;

  constructor(status: HttpStatusCode = 500, message = '') {
    super();
    this.status = status;

    this.message = message || 'Przepraszmy. Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.';
  }
}

export class TokenError extends ValidationError {
  constructor(status: HttpStatusCode = 500, message = '') {
    super(status, message);
  }
}
export class ValidationRegisterError extends ValidationError {
  constructor(status: HttpStatusCode = 500, message: ErrorLoginEntity[]) {
    super(status, JSON.stringify(message));
  }
}

export const errorHandler = (err: Errors, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationRegisterError) {
    return res.status(err.status).json({ message: JSON.parse(err.message) });
  }

  if (err instanceof TokenError || err instanceof ValidationError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({
    message: 'Przepraszmy. Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.',
  });
};
