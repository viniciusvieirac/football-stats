import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTPStatus';
import TeamService from '../services/TeamService';

export default class TeamsController {
  constructor(private teamService = new TeamService()) {}
  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getTeams();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
