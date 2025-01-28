import { Model, Sequelize } from 'sequelize';
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
export declare class TransactionModel extends Model<Transaction> implements Transaction {
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
export default function (sequelize: Sequelize): typeof TransactionModel;
