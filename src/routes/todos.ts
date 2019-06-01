import { Router } from 'express';
import * as todosControllers from '~/controllers/todos';
import { checkAuth } from '~/modules/auth';

const router = Router();

router.post('/', checkAuth, todosControllers.create);

export default router;
