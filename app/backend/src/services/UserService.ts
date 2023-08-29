import * as bcrypt from 'bcryptjs';
import UserModel from '../model/UserModel';
import IUser, { IToken, IUserLogin, IUserModel } from '../Interfaces/User';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

export default class TeamService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login({ email, password }: IUserLogin):
  Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(email: string): Promise<ServiceResponse<Pick<IUser, 'role'> | null>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
