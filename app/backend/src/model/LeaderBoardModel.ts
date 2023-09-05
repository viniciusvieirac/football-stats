import { QueryTypes } from 'sequelize';
import { getFormmatedLeaderBoard, sortLeaderboard } from '../utils/leaderboardUtils';
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

  public async getAll(): Promise<ILeaderBoard[]> {
    const [home, away] = await Promise.all(['home', 'away']
      .map((type) => this.getLeaderBoard(type as 'home' | 'away')));

    const newLeaderboard = home.reduce((formattedLeaderboard, homeTeam) => {
      const awayTeam = away.find(({ name }) => name === homeTeam.name) as ILeaderBoard;
      formattedLeaderboard.push(getFormmatedLeaderBoard(homeTeam, awayTeam));
      return formattedLeaderboard;
    }, [] as ILeaderBoard[]);

    return sortLeaderboard(newLeaderboard);
  }
}
