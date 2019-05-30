import { resolve } from '~/utils';
import { getUserRepository } from '~/db/entity/User';
import bcrypt from 'bcryptjs';

import { User, AuthRequest, GetUserRequest } from './types';
import { generateToken } from '../auth';

export async function createUser({ password, ...rest }: User) {
  const [err, user] = await resolve(
    getUserRepository().save({ ...rest, password: await bcrypt.hash(password, 10) }),
  );

  if (err != null) {
    throw new Error(`Failed to create user: \n${err}`);
  }

  return user;
}

export async function authenticateUser({ email, password }: AuthRequest): Promise<string> {
  const [, user] = await resolve(getUserRepository().findOne({ email }));
  if (user == null) {
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Incorrect password');
  }

  return generateToken({ id: String(user.id) });
}

export async function getUser({ id }: GetUserRequest) {
  const [, user] = await resolve(getUserRepository().findOne({ id }));

  if (user == null) {
    throw new Error('User not found');
  }

  delete user.password;
  return user;
}
