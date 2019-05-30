import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { getUser } from '~/modules/users';
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

function verifyToken(token: string) {
  return <TokenPayload>jwt.verify(token, process.env.JWT_SECRET!);
}

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization!;

  if (!token) {
    res.status(401).json({ error: 'Must authenticate' });
  } else {
    const { id } = verifyToken(token);
    const [err, user] = await resolve(getUser({ id: +id }));

    if (err || !user) {
      res.status(401).json({ error: 'Invalid token' });
    }

    next();
  }
}

export async function getUserFromRequest(req: Request) {
  const token = req.headers.authorization!;

  const { id } = verifyToken(token);

  return await getUser({ id: +id });
}
