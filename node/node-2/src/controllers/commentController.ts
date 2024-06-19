import { Request, Response } from 'express';
import CommentModel from '../models/commentModel';

interface IExtendRequest extends Request {
  user?: any;
}

const createComment = async (req: IExtendRequest, res: Response) => {
  try {
    const comment = await CommentModel.create(req.body.content, req.body.task_id, req.user.userId);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const getAllCommentsByTaskId = async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.findAllByTaskId(parseInt(req.params.taskId));
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    await CommentModel.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

export { createComment, getAllCommentsByTaskId, deleteComment };
