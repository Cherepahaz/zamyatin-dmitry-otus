import express from 'express';
import { createComment, getAllCommentsByTaskId, deleteComment } from '../controllers/commentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/task/:taskId', authMiddleware, getAllCommentsByTaskId);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
