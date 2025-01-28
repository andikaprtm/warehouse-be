import { User } from '../models/user.model';
import { Transaction } from 'sequelize';
declare class UserService {
    User: typeof import("../models/user.model").UserModel;
    findUserById(id: number): Promise<User>;
    updateUser(data: any, transaction?: Transaction): Promise<any>;
    loginWeb(username: string, password: string): Promise<any>;
    logout($token: string): Promise<any>;
}
export default UserService;
