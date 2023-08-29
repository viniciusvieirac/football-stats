import SequelizeTeams from '../database/models/SequelizeTeams';
import IMatch, { IMatchModel } from '../Interfaces/Matches';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const dbData = this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },

      ],
    });
    return dbData;
  }

  public async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return match;
  }

  public async getMatchByProgress(inProgress: boolean): Promise<IMatch[]> {
    const match = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return match;
  }
}
