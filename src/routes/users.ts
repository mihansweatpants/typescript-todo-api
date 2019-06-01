import { Router } from 'express';
import * as userControllers from '~/controllers/user';
import { checkAuth } from '~/modules/auth';

const router = Router();

router.post('/signup', userControllers.signup);
router.post('/auth', userControllers.auth);
router.get('/me', checkAuth, userControllers.me);
router.get('/:id', checkAuth, userControllers.getOne);
router.patch('/', checkAuth, userControllers.update);

export default router;
