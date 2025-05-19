import { Request, Response, NextFunction } from 'express';
import prisma from './prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables!');
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Missing username or password' });
    return;
  }
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
