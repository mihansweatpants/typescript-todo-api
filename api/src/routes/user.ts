import { Router } from 'express';
import * as userControllers from '~/controllers/user';

const router = Router();

router.post('/auth', userControllers.auth);

export default router;
