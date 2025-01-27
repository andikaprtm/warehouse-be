'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Unit {
    id: number;
    name: string;
}

export class UnitModel extends Model<Unit> implements Unit {
    public id!: number;
    public name!: string;
}

export default function (sequelize: Sequelize): typeof UnitModel {
    UnitModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'unit',
            modelName: 'Unit',
        }
    );
    return UnitModel;
}
