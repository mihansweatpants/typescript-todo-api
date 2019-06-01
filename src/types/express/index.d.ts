import { UserPublic } from '~/modules/users/types';

declare global {
  namespace Express {
    export interface Request {
      context: {
        user: UserPublic;
      };
    }
  }
}