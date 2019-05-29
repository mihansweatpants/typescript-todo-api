import { resolve } from '~/utils';
import { User } from '~/db/entity/User';

export async function createUser(data: any) {
  const [err, user] = await resolve<User>(User.save(data));

  if (err != null) {
    throw new Error(`Failed to create user: \n${err}`);
  }

  return user;
}
