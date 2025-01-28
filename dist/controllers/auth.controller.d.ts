import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
declare class AuthController {
    UserService: UserService;
    loginWeb: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthController;
