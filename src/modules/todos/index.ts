import { resolve } from '~/utils/resolve';
import { getTodoRepository /*, TodoEntity*/ } from '~/db/entity/Todo';

import { CreateTodoParams } from './types';

export async function createTodo({ content, user }: CreateTodoParams) {
  // const newTodo = new TodoEntity();
  // newTodo.content = content;
  // newTodo.user = user;
  const [, todo] = await resolve(getTodoRepository().save({ content, user }));

  console.log(todo);

  return todo;
}
