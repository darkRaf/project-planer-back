import { CookieOptions } from 'express';

export const userCookieSettings: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
