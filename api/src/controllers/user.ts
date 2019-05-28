import { Request, Response } from 'express';

export function auth(req: Request, res: Response) {
  res.json({ it: 'works' });
}
