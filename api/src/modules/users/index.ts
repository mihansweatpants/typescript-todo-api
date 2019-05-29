import { resolve } from '~/utils';
import { getUserRepository } from '~/db/entity/User';
import bcrypt from 'bcryptjs';

import { User } from './types';

export async function createUser({ password, ...rest }: User) {
  const [err, user] = await resolve(
    getUserRepository().save({ ...rest, password: await bcrypt.hash(password, 10) }),
  );

  if (err != null) {
    throw new Error(`Failed to create user: \n${err}`);
  }

  return user;
}
