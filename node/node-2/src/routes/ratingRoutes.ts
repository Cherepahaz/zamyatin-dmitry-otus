import express from 'express';
import { createRating, getAllRatingsByTaskId, updateRating, deleteRating } from '../controllers/ratingController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createRating);
router.get('/task/:taskId', authMiddleware, getAllRatingsByTaskId);
router.put('/:id', authMiddleware, updateRating);
router.delete('/:id', authMiddleware, deleteRating);

export default router;
