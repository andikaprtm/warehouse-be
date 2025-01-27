'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TransactionItem {
    id: number;
    transactionId: number;
    productCode: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class TransactionItemModel extends Model<TransactionItem> implements TransactionItem {
    public id!: number;
    public transactionId!: number;
    public productCode!: string;
    public quantity!: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

export default function (sequelize: Sequelize): typeof TransactionItemModel {
    TransactionItemModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            transactionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'transaction_id',
                references: {
                    model: 'transaction',
                    key: 'id',
                },
            },
            productCode: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            tableName: 'transaction_item',
            modelName: 'TransactionItem',
            paranoid: true,
        }
    );
    return TransactionItemModel;
}