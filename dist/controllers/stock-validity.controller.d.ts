import { Request, Response, NextFunction } from 'express';
declare class StockValidityController {
    private transactionService;
    stockCheck: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
export default StockValidityController;
