import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create(username, hashedPassword, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }

}

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByUsername(username);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secret_key');
    res.json({ token });
  }
  catch (err) {
    res.status(500).json({ error: err }); //По-хорошему, доделать, чтоб дергался текст ошибки
  }
}

export { register, login };