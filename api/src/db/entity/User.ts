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
    username: {
      type: String,
      nullable: false,
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

// @Entity('users')
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false, unique: true })
//   email: string;

//   @Column({ nullable: false, unique: true })
//   username: string;

//   @Column({ type: 'text', nullable: false })
//   password: string;

//   @Column({ nullable: true })
//   avatar: string;
// }
