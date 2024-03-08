import { Router } from 'express';
import { getUser, signUp, login, logout } from '../controllers/user.controller';
import { requiresAuth } from "../middleware/auth";

const router = Router();

router.get('/', requiresAuth, getUser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;