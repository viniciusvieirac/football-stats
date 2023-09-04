import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTPStatus';
import MatchesService from '../services/MatchesService';

export default class MacthesController {
  constructor(private matchService = new MatchesService()) {}
  public async getAllMatches(req: Request, res: Response) {
    const query = req.query.inProgress as string;
    const { status, data } = await this.matchService.getMatches(query);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = req.body;
    const { status, data } = await this.matchService.updateMatch(Number(id), result);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const match = req.body;
    const { status, data } = await this.matchService.createMatch(match);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
