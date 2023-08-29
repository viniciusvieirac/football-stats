import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam, { ITeamModel } from '../Interfaces/Teams';
import TeamsModel from '../model/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamsModel()) {}

  public async getTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
