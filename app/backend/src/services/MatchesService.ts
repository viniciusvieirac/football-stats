import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch, { IMatchModel } from '../Interfaces/Matches';
import MatchModel from '../model/MatchesModel';

export default class TeamService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) {
      const matches = await this.matchModel.getMatchByProgress(inProgress === 'true');
      return { status: 'SUCCESSFUL', data: matches };
    }
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }
}
