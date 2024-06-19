import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('interviewer'), getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware('interviewer'), getUserById);
router.put('/:id', authMiddleware, roleMiddleware('interviewer'), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('interviewer'), deleteUser);

export default router;
