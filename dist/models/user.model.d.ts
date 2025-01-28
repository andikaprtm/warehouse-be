import { Model, Sequelize } from 'sequelize';
export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    role: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export declare class UserModel extends Model<User> implements User {
    id: number;
    name: string;
    username: string;
    password: string;
    role: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export default function (sequelize: Sequelize): typeof UserModel;
