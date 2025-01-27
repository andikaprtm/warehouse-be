import { Request, Response, NextFunction } from 'express';
import StockValidationService from '@/services/stock-validation.service'; 
class StockValidityController {
	private transactionService = new StockValidationService();

	public stockCheck = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const stockData: Array<{ productCode: string; quantity: number }> = req.body.items;
			const results = await this.transactionService.stockCheck(stockData);

			return res.status(200).json({
				code: 1,
				message: ['Stock checked successfully'],
				data: results,
			});
		} catch (error) {
			console.log(error)
			next(error);
		}
	};
}

export default StockValidityController;
