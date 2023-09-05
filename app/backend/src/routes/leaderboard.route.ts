import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/home', (_req: Request, res: Response) => leaderBoardController
  . getLeaderBoardHome(_req, res));
router.get('/away', (_req: Request, res: Response) => leaderBoardController
  .getLeaderBoardAway(_req, res));

export default router;
