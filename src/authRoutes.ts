import { Router } from 'express';
import { loginUser } from './authController';

const router = Router();

router.post('/login', loginUser);

export default router;
