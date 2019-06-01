import { Omit } from '~/utils/types';
import { Todo } from '~/modules/todos/types';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  avatar: string;
  todos?: Todo[];
}

export type UserPublic = Omit<User, 'password'>;

export interface AuthParams {
  email: string;
  password: string;
}

export interface GetUserParams {
  id: number;
}
