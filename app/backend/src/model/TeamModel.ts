import ITeam, { ITeamModel } from '../Interfaces/Teams';
import SequelizeTeam from '../database/models/SequelizeTeams';

export default class implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbData = this.model.findAll();
    return dbData;
  }

  public async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
