import { Model, Sequelize } from 'sequelize';
export interface UnitSize {
    id: number;
    unitId: number;
    name: string;
}
export declare class UnitSizeModel extends Model<UnitSize> implements UnitSize {
    id: number;
    unitId: number;
    name: string;
}
export default function (sequelize: Sequelize): typeof UnitSizeModel;
