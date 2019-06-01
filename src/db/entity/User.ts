import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm';
import { User } from '~/modules/users/types';

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
}

export const getUserRepository = () => getRepository(UserEntity);
