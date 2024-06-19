import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';

interface IExtendRequest extends Request {
  user?: any;
}

const createTask = async (req: IExtendRequest, res: Response) => {
  try {
    const task = await TaskModel.create({ ...req.body, created_by: req.user.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.update(parseInt(req.params.id), req.body);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    await TaskModel.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
