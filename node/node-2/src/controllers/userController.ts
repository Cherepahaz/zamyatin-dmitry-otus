import { Request, Response } from 'express';
import UserModel from '../models/userModel';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.update(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserModel.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser };
