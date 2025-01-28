import { Routes } from '../../interfaces/routes.interface';
import TransactionController from '../../controllers/transaction.controller';
declare class TransactionRoute implements Routes {
    router: import("express-serve-static-core").Router;
    transactionController: TransactionController;
    constructor();
    private initializeRoutes;
}
export default TransactionRoute;
