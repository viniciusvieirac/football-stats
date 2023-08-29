import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (_req: Request, res: Response) => teamsController.getAllTeams(_req, res));
router.get('/:id', (_req: Request, res: Response) => teamsController.getTeamById(_req, res));

export default router;
