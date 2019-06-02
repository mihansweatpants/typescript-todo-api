import { Entity, PrimaryGeneratedColumn, Column, getRepository, OneToMany } from 'typeorm';
import { User } from '~/modules/users/types';
import { Todo } from '~/modules/todos/types';
import { TodoEntity } from './Todo';

@Entity({ name: 'users' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => TodoEntity, todo => todo.user)
  todos: Todo[];
}

export const getUserRepository = () => getRepository(UserEntity);
