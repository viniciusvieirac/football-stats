import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderBoard, { ILeaderBoardParams } from '../Interfaces/ILeaderBoard';
import LeaderBoardModel from '../model/LeaderBoardModel';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = new LeaderBoardModel()) { } // eslint-disable-line

  public async getLeaderBoard(principal: ILeaderBoardParams):
  Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.leaderBoardModel.getLeaderBoard(principal);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
