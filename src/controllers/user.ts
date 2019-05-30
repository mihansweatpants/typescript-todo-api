import { Request, Response } from 'express';

import { resolve } from '~/utils';

import * as users from '~/modules/users';

export async function signup(req: Request, res: Response) {
  const [err, token] = await resolve(users.createUser(req.body));

  if (err != null) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(201).json({ data: { token } });
  }
}

export async function auth(req: Request, res: Response) {
  const [err, token] = await resolve(users.authenticateUser(req.body));

  if (err != null) {
    res.status(401).json({ error: err.message });
  } else {
    res.status(200).json({ data: { token } });
  }
}

export async function me(req: Request, res: Response) {
  const user = req.context.user;

  res.status(200).json({ data: user });
}

export async function getOne(req: Request, res: Response) {
  const { id } = req.params;

  if (id == null) {
    res.status(400).json({ error: 'id parameter must be specified' });
  }

  const [err, user] = await resolve(users.getUser({ id }));

  if (err != null) {
    res.json({ err: err.message });
  } else {
    res.status(200).json({ data: user });
  }
}

export async function update(req: Request, res: Response) {
  if (req.context.user.id !== req.body.id) {
    res.status(403).json({ error: 'Can\'t modify resource' });
  }

  const [err, user] = await resolve(users.updateUser(req.body));

  if (err != null) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(200).json({ data: user });
  }
}
