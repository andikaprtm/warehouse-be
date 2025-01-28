import { Model, Sequelize } from 'sequelize';
export interface TransactionItem {
    id: number;
    transactionId: number;
    productCode: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export declare class TransactionItemModel extends Model<TransactionItem> implements TransactionItem {
    id: number;
    transactionId: number;
    productCode: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export default function (sequelize: Sequelize): typeof TransactionItemModel;
