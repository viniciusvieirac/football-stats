import { ICRUDModelReader } from './ICrudModel';

export default interface ITeam {
  id: number;
  teamName: string;
}

export type ITeamModel = ICRUDModelReader<ITeam>;
