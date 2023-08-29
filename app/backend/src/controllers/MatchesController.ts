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
}
