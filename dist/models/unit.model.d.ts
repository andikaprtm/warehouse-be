import { Model, Sequelize } from 'sequelize';
export interface Unit {
    id: number;
    name: string;
}
export declare class UnitModel extends Model<Unit> implements Unit {
    id: number;
    name: string;
}
export default function (sequelize: Sequelize): typeof UnitModel;
