import { Router } from 'express';
import teamsRouter from './teams.route';

const router = Router();

router.use('/teste', (_req, res) => res.json({ message: 'Hello World' }));
router.use('/teams', teamsRouter);

export default router;
