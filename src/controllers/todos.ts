import { Request, Response } from 'express';
import { resolve } from '~/utils';
import * as todos from '~/modules/todos';

export async function create(req: Request, res: Response) {
  const [err, todo] = await resolve(todos.createTodo({ ...req.body, user: req.context.user }));

  if (err != null) {
    res.status(500).json({ error: `Unable to create todo: \n${err.message}` });
  }

  res.status(201).json({ data: todo });
}

export async function list(req: Request, res: Response) {
  const [err, todosList] = await resolve(todos.getTodos());

  if (err != null) {
    res.status(500).json({ error: `Unable to get todos: \n${err.message}` });
  }

  res.status(200).json({ data: todosList });
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;

  if (id == null) {
    res.status(400).json({ error: 'id parameter should be specified' });
  }

  const [, todo] = await resolve(todos.getTodo({ id }));

  if (req.context.user.id !== todo!.user.id) {
    res.status(403).json({ error: 'Can\'t modify resource' });
  }

  const [err, updatedTodo] = await resolve(todos.updateTodo({ id, ...req.body }));

  if (err != null) {
    res.status(500).json(`Unable to update todo: \n${err.message}`);
  }

  res.status(200).json({ data: updatedTodo });
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;

  if (id == null) {
    res.status(400).json({ error: 'id parameter should be specified' });
  }

  const [, todo] = await resolve(todos.getTodo({ id }));

  if (req.context.user.id !== todo!.user.id) {
    res.status(403).json({ error: 'Can\'t modify resource' });
  }

  const [err] = await resolve(todos.deleteTodo(todo!));

  if (err != null) {
    res.status(500).json(`Unable to delete todo: \n${err.message}`);
  }

  res.status(200).json({ data: null });
}
