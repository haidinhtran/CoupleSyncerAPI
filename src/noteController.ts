import { Response, NextFunction } from 'express';
import prisma from './prismaClient';
import { AuthRequest } from './middleware/authenticateJWT';

export const createNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, content } = req.body;
  const userId = req.userId;
  if (!title || !content || !userId) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(note);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
