import { UserPublic } from '~/modules/users/types';

export interface Todo {
  created_at: string;
  updated_at: string;
  is_complete: boolean;
  id: number;
  content: string;
  user: UserPublic;
}

export interface CreateTodoParams {
  content: string;
  user: UserPublic;
}

export interface UpdateTodoParams {
  id: number;
  content: string;
  is_complete: boolean;
}

export interface GetTodoParams {
  id: number;
}

export interface DeleteTodoParams {
  id: number;
}
