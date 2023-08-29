export default interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}
export type IUserLogin = Pick<IUser, 'email' | 'password'>;

export type IUserModel = { findByEmail(email: IUser['email']): Promise<IUser | null> };

export type IToken = {
  token: string;
};
