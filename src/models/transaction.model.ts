'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Transaction {
    id: number;
    deliveryOrderNumber: string;
    organizerName: string;
    approvalName: string;
    senderName: string;
    recipientName: string;
    totalQuantity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class TransactionModel extends Model<Transaction> implements Transaction {
    public id!: number;
    public deliveryOrderNumber!: string;
    public organizerName!: string;
    public approvalName!: string;
    public senderName!: string;
    public recipientName!: string;
    public totalQuantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date;
}

export default function (sequelize: Sequelize): typeof TransactionModel {
    TransactionModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            deliveryOrderNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            organizerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            approvalName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            senderName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recipientName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totalQuantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            tableName: 'transaction',
            modelName: 'Transaction',
            paranoid: true,
        }
    );
    return TransactionModel;
}
