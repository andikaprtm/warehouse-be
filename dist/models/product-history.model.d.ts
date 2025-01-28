import { Model, Sequelize } from 'sequelize';
export interface ProductHistory {
    id: number;
    productId: number;
    deliveryOrderNumber?: string;
    quantityChange: number;
    reason: string;
    timestamp: Date;
}
export declare class ProductHistoryModel extends Model<ProductHistory> implements ProductHistory {
    id: number;
    productId: number;
    deliveryOrderNumber?: string;
    quantityChange: number;
    reason: string;
    timestamp: Date;
}
export default function (sequelize: Sequelize): typeof ProductHistoryModel;
