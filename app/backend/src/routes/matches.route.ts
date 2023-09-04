import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateLogin from '../middlewares/validateLogin';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (_req: Request, res: Response) => matchesController.getAllMatches(_req, res));
router.patch(
  '/:id',
  validateLogin.validateToken,
  (_req: Request, res: Response) => matchesController.updateMatch(_req, res),
);
router.patch(
  '/:id/finish',
  validateLogin.validateToken,
  (_req: Request, res: Response) => matchesController.finishMatch(_req, res),
);

router.post(
  '/',
  validateLogin.validateToken,
  (_req: Request, res: Response) => matchesController.createMatch(_req, res),
);

export default router;
