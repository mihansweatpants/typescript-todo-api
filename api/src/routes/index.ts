import { Router } from 'express';

import userRoutes from './user';

const baseRouter = Router();

baseRouter.use('/users', userRoutes);

export default baseRouter;
