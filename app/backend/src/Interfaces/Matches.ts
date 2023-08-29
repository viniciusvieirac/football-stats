import { ICRUDModelReader } from './ICrudModel';

export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel extends ICRUDModelReader<IMatch>{
  getMatchByProgress(inProgress: boolean): Promise<IMatch[]>
}
