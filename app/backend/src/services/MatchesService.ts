import { NewEntity } from '../Interfaces';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
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

  public async updateMatch(id: number, result: IMatch)
    : Promise<ServiceResponse<IMatch | null>> {
    const match = this.matchModel.findById(id);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    const updateMatch = await this.matchModel.update(id, result);
    return { status: 'SUCCESSFUL', data: updateMatch };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.finishMatch(id);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { awayTeamId, homeTeamId } = match;
    if (awayTeamId === homeTeamId) {
      return { status: 'CONFLICT',
        data:
      { message: 'It is not possible to create a match with two equal teams' } };
    }
    const teamOne = await this.matchModel.findById(match.homeTeamId);
    const teamTwo = await this.matchModel.findById(match.awayTeamId);
    if (!teamOne || !teamTwo) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.create(match);
    return { status: 'CREATED', data: newMatch };
  }
}
