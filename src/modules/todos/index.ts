import { resolve } from '~/utils/resolve';
import { getTodoRepository } from '~/db/entity/Todo';

import { CreateTodoParams, Todo, UpdateTodoParams, GetTodoParams, DeleteTodoParams } from './types';

export async function createTodo({ content, user }: CreateTodoParams): Promise<Todo> {
  const [err, todo] = await resolve(getTodoRepository().save({ content, user }));

  if (err != null) {
    throw new Error(err.message);
  }

  return todo!;
}

export async function getTodos(): Promise<Todo[]> {
  const [err, todos] = await resolve(getTodoRepository().find());

  if (err != null) {
    throw new Error(err.message);
  }

  return todos!;
}

export async function getTodo({ id }: GetTodoParams): Promise<Todo> {
  const [err, todo] = await resolve(getTodoRepository().findOne({ id }));

  if (err != null) {
    throw new Error(err.message);
  }

  return todo!;
}

export async function updateTodo({ id, ...params }: UpdateTodoParams): Promise<Todo> {
  const [err] = await resolve(getTodoRepository().update({ id }, params));

  if (err != null) {
    throw new Error(err.message);
  }

  return getTodo({ id });
}

export async function deleteTodo({ id }: DeleteTodoParams) {
  const [err] = await resolve(getTodoRepository().delete({ id }));

  if (err != null) {
    throw new Error(err.message);
  }

  return null;
}
