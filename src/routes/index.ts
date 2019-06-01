import { Router } from 'express';

import userRoutes from './users';
import todosRoutes from './todos';

const baseRouter = Router();

baseRouter.use('/users', userRoutes);
baseRouter.use('/todos', todosRoutes);

export default baseRouter;
