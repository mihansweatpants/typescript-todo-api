import { resolve } from '~/utils';
import { getUserRepository } from '~/db/entity/User';
import bcrypt from 'bcryptjs';

import { User, AuthParams, GetUserParams, UserPublic } from './types';
import { generateToken } from '../auth';

export async function createUser({ password, ...rest }: User): Promise<string> {
  const [err, user] = await resolve(
    getUserRepository().save({ ...rest, password: await bcrypt.hash(password, 10) }),
  );

  if (err != null) {
    throw new Error(`Failed to create user: \n${err}`);
  }

  return generateToken({ id: String(user!.id) });
}

export async function authenticateUser({ email, password }: AuthParams): Promise<string> {
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

export async function getUser({ id }: GetUserParams): Promise<UserPublic> {
  const [, user] = await resolve(getUserRepository().findOne({ id }));

  if (user == null) {
    throw new Error('User not found');
  }

  return user;
}

export async function updateUser(user: User): Promise<UserPublic> {
  const { id, password } = user;

  if (password != null) {
    user.password = await bcrypt.hash(password, 10);
  }

  const [err] = await resolve(getUserRepository().update({ id }, user));

  if (err != null) {
    throw new Error(`Could not update user: ${err}`);
  }

  return getUser({ id });
}
