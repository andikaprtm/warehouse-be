'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Type {
    id: number;
    name: string;
}

export class TypeModel extends Model<Type> implements Type {
    public id!: number;
    public name!: string;
}

export default function (sequelize: Sequelize): typeof TypeModel {
    TypeModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'type',
            modelName: 'Type',
        }
    );
    return TypeModel;
}
