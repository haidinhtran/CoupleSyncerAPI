import { NextFunction, Request, Response } from 'express';
import prisma from './prismaClient';
import bcrypt from 'bcryptjs';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Username or email already exists' });
      return;
    }
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
