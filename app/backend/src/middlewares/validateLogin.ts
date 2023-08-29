import { NextFunction, Request, Response } from 'express';
import JWT, { TokenJWT } from '../utils/JWT';

export default class validateLogin {
  static regexEmail(email: string): boolean {
    const regex = /^(?![a-z0-9]+\.)+[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    const emailValid = validateLogin.regexEmail(user.email);

    if (notFoundKey || user.email.length === 0 || user.password.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const JWTToken = JWT.extractToken(token);
    const validToken = JWT.verify(JWTToken);
    const tokenDecode: TokenJWT = JWT.decode(JWTToken);
    if (validToken === 'Token must be a valid Token' || !tokenDecode) {
      return res.status(401).json({ message: validToken });
    }

    req.body.email = tokenDecode.email;

    next();
  }
}
