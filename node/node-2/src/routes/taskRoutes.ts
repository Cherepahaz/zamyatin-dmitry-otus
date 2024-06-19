import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('interviewer'), createTask);
router.get('/', authMiddleware, getAllTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, roleMiddleware('interviewer'), updateTask);
router.delete('/:id', authMiddleware, roleMiddleware('interviewer'), deleteTask);

export default router;
