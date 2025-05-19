import { Router } from 'express';
import { registerUser } from './userController';
import rateLimit from 'express-rate-limit';

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tối đa 5 lần đăng ký mỗi IP trong 15 phút
  message: {
    message: 'Too many accounts created from this IP, please try again later.',
  },
});

router.post('/register', registerLimiter, registerUser);

export default router;
