import { Router } from 'express';
import teamsRouter from './teams.route';
import userRouter from './user.route';
import matchesRouter from './matches.route';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
