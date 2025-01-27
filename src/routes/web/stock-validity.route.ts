import { Router } from 'express';
import StockValidityController from '@/controllers/stock-validity.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { StockCheckDto } from '@/dtos/stock-validity.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import RoleMiddleware from '@/middlewares/role.middleware';
import { Role } from '@/utils/enum.utils';

class StockValidityRoute {
	public router = Router();
	public transactionController = new StockValidityController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(
			'/stock',
			authMiddleware,
			RoleMiddleware({
				roles: [Role.OFFICE_ADMIN],
			}),
			this.router
		);

		/**
		 * @openapi
		 * /stock/check:
		 *   post:
		 *     tags:
		 *       - Stock Validity
		 *     summary: Check stock availability
		 *     description: Checks the availability of stock for a list of products.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: array
		 *             items:
		 *               type: object
		 *               properties:
		 *                 productCode:
		 *                   type: string
		 *                   description: The code of the product to check stock for.
		 *                   example: "P001"
		 *                 quantity:
		 *                   type: integer
		 *                   description: The quantity of the product requested.
		 *                   example: 5
		 *               required:
		 *                 - productCode
		 *                 - quantity
		 *     responses:
		 *       200:
		 *         description: Successfully checked stock
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: array
		 *               items:
		 *                 type: object
		 *                 properties:
		 *                   productCode:
		 *                     type: string
		 *                   valid:
		 *                     type: boolean
		 *                   remainingStock:
		 *                     type: integer
		 *       400:
		 *         description: Bad request
		 */

		this.router.post('/check',
			validationMiddleware(StockCheckDto, 'body'),
			this.transactionController.stockCheck
		);
	}
}

export default StockValidityRoute;
