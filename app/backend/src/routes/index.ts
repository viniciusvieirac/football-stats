import { Router } from 'express';
import teamsRouter from './teams.route';
import userRouter from './user.route';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);

export default router;
