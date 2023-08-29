import IUser, { IUserModel } from '../Interfaces/User';
import SequelizeUser from '../database/models/SequelizeUser';

export default class implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({
      where: { email },
    });
    return dbData;
  }
}
