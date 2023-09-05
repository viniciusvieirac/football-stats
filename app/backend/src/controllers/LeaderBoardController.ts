import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTPStatus';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}
  public async getLeaderBoardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.getLeaderBoard('home');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderBoardAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.getLeaderBoard('away');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.getAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
