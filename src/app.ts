import express, { Request, Response } from 'express';
import userRoutes from './userRoutes';
import noteRoutes from './noteRoutes';
import authRoutes from './authRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Couple Syncer API');
});

app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
