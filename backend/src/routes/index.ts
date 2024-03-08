import express from 'express';
import { requiresAuth } from "../middleware/auth";

import routerTask from './tasks.routes';
import routerUser from './users.routes';

const router = express.Router();

router.use('/tasks', requiresAuth, routerTask);
router.use('/users', routerUser);

export default router;