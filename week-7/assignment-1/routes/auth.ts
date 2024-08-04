import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/';
const {  authenticateJwt, SECRET } = middleware;
import db from '../db';
const { User } = db;

const router = express.Router();

type Input = {
  username: string,
  password: string
}

  router.post('/signup', async (req: Request, res: Response) => {
    const { username, password } : Input = req.body as Input;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req: Request, res: Response) => {
    const { username, password }: Input = req.body as Input;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req: Request, res: Response) => {
      const user = await User.findOne({ _id: req.headers.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  export default router;