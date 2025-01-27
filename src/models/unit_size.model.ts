'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UnitSize {
    id: number;
    unitId: number;
    name: string;
}

export class UnitSizeModel extends Model<UnitSize> implements UnitSize {
    public id!: number;
    public unitId!: number;
    public name!: string;
}

export default function (sequelize: Sequelize): typeof UnitSizeModel {
    UnitSizeModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            unitId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'unit_id',
                references: {
                    model: 'unit',
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'unit_size',
            modelName: 'UnitSize',
        }
    );
    return UnitSizeModel;
}
