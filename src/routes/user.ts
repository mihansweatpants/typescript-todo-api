import { Router } from 'express';
import * as userControllers from '~/controllers/user';
import { checkAuth } from '~/auth';

const router = Router();

router.post('/create', userControllers.create);
router.post('/auth', userControllers.auth);
router.get('/me', checkAuth, userControllers.me);
router.get('/:id', checkAuth, userControllers.getOne);

export default router;
