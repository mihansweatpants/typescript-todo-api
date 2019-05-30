import { EntitySchema, getRepository } from 'typeorm';
import { User } from '~/modules/users/types';

export const UserEntity = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    username: {
      type: String,
      nullable: false,
      unique: true,
    },
    password: {
      type: String,
      nullable: false,
    },
    avatar: {
      type: String,
      nullable: true,
    },
  },
});

export const getUserRepository = () => getRepository(UserEntity);
