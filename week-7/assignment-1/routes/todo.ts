import express, { Request, Response, NextFunction } from 'express';
import { authenticateJwt, SECRET } from '../middleware/';
import { Todo } from '../db';
import {z} from "zod";

const router = express.Router();

// type Input = {
//   title: string,
//   description: string,
//   done: boolean
// }

const InputProps = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(300)
})

router.post('/todos', authenticateJwt, (req: Request, res: Response) => {
  const parsedInput = InputProps.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(411).json({message: parsedInput.error});
  }
  
  const { title, description } = parsedInput.data;
  const done = false;
  const userId = req.headers["userId"];

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: Request, res: Response) => {
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;