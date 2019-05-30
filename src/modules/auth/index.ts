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

function getToken(request: Request): string | null {
  const { authorization } = request.headers;
  if (authorization == null) {
    return null;
  }

  const [, token] = authorization.split(' ');

  return token;
}

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req);

  if (token == null) {
    res.status(401).json({ error: 'Must authenticate' });
  } else {
    const { id } = verifyToken(token);
    const [err, user] = await resolve(getUser({ id: +id }));

    if (err || !user) {
      res.status(401).json({ error: 'Invalid token' });
    }

    req.context = { user: user! };
    next();
  }
}
