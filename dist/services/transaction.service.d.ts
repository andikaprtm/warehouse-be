import { Transaction as TransactionModel } from '../models/transaction.model';
import { ResponseList } from '../interfaces/ResponseList.interface';
import { Transaction } from 'sequelize';
import { TransactionItem } from '../models/transaction_item.model';
declare class TransactionService {
    User: typeof import("../models/user.model").UserModel;
    Product: typeof import("../models/product.model").ProductModel;
    Unit: typeof import("../models/unit.model").UnitModel;
    UnitSize: typeof import("../models/unit_size.model").UnitSizeModel;
    Type: typeof import("../models/type.model").TypeModel;
    Transaction: typeof import("../models/transaction.model").TransactionModel;
    TransactionItem: typeof import("../models/transaction_item.model").TransactionItemModel;
    getListTransaction(page: number, dataPerPage: number, query: any): Promise<ResponseList>;
    getTransactionById(id: number): Promise<TransactionModel>;
    createTransaction(data: any, transaction?: Transaction): Promise<TransactionModel>;
    updateTransaction(id: number, data: any): Promise<any>;
    deleteTransaction(id: number): Promise<TransactionModel>;
    addItem(id: number, data: any): Promise<any>;
    updateItem(transactionId: number, productCode: string, data: any): Promise<any>;
    deleteItem(id: number, productCode: string): Promise<any>;
    getDetailItem(id: string): Promise<TransactionItem>;
    getTransactionItems(id: number, page: number, dataPerPage: number, query: any): Promise<ResponseList>;
}
export default TransactionService;
