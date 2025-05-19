import { Router } from 'express';
import { createNote } from './noteController';
import { authenticateJWT } from './middleware/authenticateJWT';

const router = Router();

router.post('/create', authenticateJWT, createNote);

export default router;
