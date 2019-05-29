import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { User } from '~/db/entity/User';
import { resolve } from '~/utils';

const TOKEN_LIFETIME = 1000 * 60 * 60 * 24;

interface TokenPayload {
  id: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET!,
    { expiresIn: TOKEN_LIFETIME },
  );
}

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    next(new Error('Must Authenticate'));
  }

  const { id } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET!);
  const [err, user] = await resolve(User.getRepository().findOne({ id: +id }));

  if (err || !user) {
    next(new Error('Invalid token'));
  }

  req;
}
