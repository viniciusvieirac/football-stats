import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTPStatus';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { status, data } = await this.userService.getUserRole(email);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
// teste
