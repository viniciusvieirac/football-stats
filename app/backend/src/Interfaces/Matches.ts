import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from './ICrudModel';

export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel extends ICRUDModelReader<IMatch>, ICRUDModelUpdater<IMatch>,
  ICRUDModelCreator<IMatch> {
  getMatchByProgress(inProgress: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<[affectedCount: number]>
}
