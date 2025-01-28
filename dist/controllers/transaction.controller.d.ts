import { Request, Response, NextFunction } from 'express';
import TransactionService from '../services/transaction.service';
declare class TransactionController {
    transactionService: TransactionService;
    getListTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTransactionDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDetailItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTransactionItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default TransactionController;
