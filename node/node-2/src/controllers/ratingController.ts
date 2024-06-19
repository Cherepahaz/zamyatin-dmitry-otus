import { Request, Response } from 'express';
import RatingModel from '../models/ratingModel';

interface IExtendRequest extends Request {
  user?: any;
}

const createRating = async (req: IExtendRequest, res: Response) => {
  try {
    const rating = await RatingModel.create(req.body.task_id, req.user.userId, req.body.rating);
    res.status(201).json(rating);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const getAllRatingsByTaskId = async (req: Request, res: Response) => {
  try {
    const ratings = await RatingModel.findAllByTaskId(parseInt(req.params.taskId));
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const updateRating = async (req: Request, res: Response) => {
  try {
    const rating = await RatingModel.update(parseInt(req.params.id), req.body.rating);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const deleteRating = async (req: Request, res: Response) => {
  try {
    await RatingModel.delete(parseInt(req.params.id));
    res.status(204).send();
  }
  catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

export { createRating, getAllRatingsByTaskId, updateRating, deleteRating };
