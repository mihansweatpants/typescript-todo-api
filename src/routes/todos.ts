import { Router } from 'express';
import * as todosControllers from '~/controllers/todos';
import { checkAuth } from '~/modules/auth';

const router = Router();

router.get('/', todosControllers.list);
router.post('/', checkAuth, todosControllers.create);
router.patch('/:id', checkAuth, todosControllers.update);
router.delete('/:id', checkAuth, todosControllers.remove);

export default router;
