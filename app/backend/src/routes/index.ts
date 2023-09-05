import { Router } from 'express';
import teamsRouter from './teams.route';
import userRouter from './user.route';
import matchesRouter from './matches.route';
import leaderBoardRouter from './leaderboard.route';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
