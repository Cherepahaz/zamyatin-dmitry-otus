import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import commentRoutes from './routes/commentRoutes';
import ratingRoutes from './routes/ratingRoutes';
import userRoutes from './routes/userRoutes';
import authMiddleware from './middlewares/authMiddleware';

const app = express();

app.use(bodyParser.json());
console.log(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', authMiddleware, userRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});