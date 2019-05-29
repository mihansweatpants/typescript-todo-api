import { Router } from 'express';
import * as userControllers from '~/controllers/user';

const router = Router();

router.post('/create', userControllers.create);

export default router;
