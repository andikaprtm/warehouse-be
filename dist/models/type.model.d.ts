import { Model, Sequelize } from 'sequelize';
export interface Type {
    id: number;
    name: string;
}
export declare class TypeModel extends Model<Type> implements Type {
    id: number;
    name: string;
}
export default function (sequelize: Sequelize): typeof TypeModel;
