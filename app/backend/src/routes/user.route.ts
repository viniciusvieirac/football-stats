import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userController = new UserController();

const router = Router();

router.get(
  '/role',
  validateLogin.validateToken,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

router.post(
  '/',
  validateLogin.validateUser,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
