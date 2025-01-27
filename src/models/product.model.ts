'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Product {
    id: number;
    code: string;
    name: string;
    typeId: number;
    unitId: number;
    unitSizeId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class ProductModel extends Model<Product> implements Product {
    public id!: number;
    public code!: string;
    public name!: string;
    public typeId!: number;
    public unitId!: number;
    public unitSizeId!: number;
    public quantity!: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            typeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'type_id',
                references: {
                    model: 'type',
                    key: 'id',
                },
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
            unitSizeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'unit_size_id',
                references: {
                    model: 'unit_size',
                    key: 'id',
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                allowNull: true,
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deleted_at',
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'product',
            modelName: 'Product',
            paranoid: true, // Enables soft deletes
        }
    );
    return ProductModel;
}