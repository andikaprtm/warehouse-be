import { Model, Sequelize } from 'sequelize';
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
export declare class ProductModel extends Model<Product> implements Product {
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
export default function (sequelize: Sequelize): typeof ProductModel;
