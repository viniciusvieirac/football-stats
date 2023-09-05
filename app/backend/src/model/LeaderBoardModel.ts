import { QueryTypes } from 'sequelize';
import { awayTeamQuery, homeTeamQuery } from '../utils/querySQL';
import ILeaderBoard, { ILeaderBoardParams } from '../Interfaces/ILeaderBoard';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class LeaderBoardModel {
  private model = SequelizeMatch;

  public async getLeaderBoard(principal: ILeaderBoardParams): Promise<ILeaderBoard[]> {
    if (principal === 'home') {
      const matches = await this.model.sequelize?.query(
        homeTeamQuery,
        { type: QueryTypes.SELECT },
      ) as ILeaderBoard[];
      return matches as ILeaderBoard[];
    }
    const matches = await this.model.sequelize?.query(
      awayTeamQuery,
      { type: QueryTypes.SELECT },
    ) as ILeaderBoard[];
    return matches as ILeaderBoard[];
  }
}
