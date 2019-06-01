import { Request, Response } from 'express';
import { resolve } from '~/utils';
import * as todos from '~/modules/todos';

export async function create(req: Request, res: Response) {
  const [, todo] = await resolve(todos.createTodo({ ...req.body, user: req.context.user }));

  res.status(201).json({ data: todo });
}
