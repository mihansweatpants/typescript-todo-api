import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from '~/modules/todos/types';
import { UserPublic } from '~/modules/users/types';
import { UserEntity } from './User';

@Entity({ name: 'todos' })
export class TodoEntity implements Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  complete: boolean;

  @Column()
  content: string;

  @ManyToOne(type => UserEntity, user => user.todos)
  user: UserPublic;
}

export const getTodoRepository = () => getRepository(TodoEntity);
