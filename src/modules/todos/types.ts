import { UserPublic } from '~/modules/users/types';

export interface Todo {
  created_at: string;
  updated_at: string;
  complete: boolean;
  id: number;
  content: string;
  user: UserPublic;
}

export interface CreateTodoParams {
  content: string;
  user: UserPublic;
}
