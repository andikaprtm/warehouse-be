'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProductHistory {
    id: number;
    productId: number;
    deliveryOrderNumber?: string; // Optional, can be null
    quantityChange: number;
    reason: string;
    timestamp: Date;
}

export class ProductHistoryModel extends Model<ProductHistory> implements ProductHistory {
    public id!: number;
    public productId!: number;
    public deliveryOrderNumber?: string; // Optional
    public quantityChange!: number;
    public reason!: string;
    public timestamp!: Date;
}

export default function (sequelize: Sequelize): typeof ProductHistoryModel {
    ProductHistoryModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'product', 
                    key: 'id',
                },
            },
            deliveryOrderNumber: {
                type: DataTypes.STRING(100),
                allowNull: true, 
            },
            quantityChange: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reason: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'product_histories',
            modelName: 'ProductHistory',
            timestamps: false, 
        }
    );
    return ProductHistoryModel;
}
