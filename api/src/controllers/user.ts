import { Request, Response } from 'express';

import { resolve } from '~/utils';
import { createUser } from '~/modules/users';

export async function create(req: Request, res: Response) {
  const [err, user] = await resolve(createUser(req.body));

  if (err != null) {
    res.status(500).json({ error: err.message });
  } else {
    delete user!.password;
    res.status(201).json();
  }
}
