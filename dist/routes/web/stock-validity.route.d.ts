import StockValidityController from '../../controllers/stock-validity.controller';
declare class StockValidityRoute {
    router: import("express-serve-static-core").Router;
    transactionController: StockValidityController;
    constructor();
    private initializeRoutes;
}
export default StockValidityRoute;
