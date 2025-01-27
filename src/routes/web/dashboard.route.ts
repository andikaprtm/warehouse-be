import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import RoleMiddleware from '@/middlewares/role.middleware';
import { Role } from '@/utils/enum.utils';
import DashboardController from '@/controllers/dashboard.controller';

class DashboardRoute implements Routes {
	public router = Router();
	public dashboardController = new DashboardController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(
			'/dashboard',
			authMiddleware,
			RoleMiddleware({
				roles: [Role.WAREHOUSE_ADMIN],
			}),
			this.router
		);

		/**
		 * @openapi
		 * /dashboard/data:
		 *   get:
		 *     tags:
		 *       - Dashboard
		 *     summary: Get Dashboard data
		 *     description: Retrieves a Dashboard data.
		 *     parameters:
		 *       - in: query
		 *         name: year
		 *         required: false
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved dashboard data
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               properties:
		 *                 code:
		 *                   type: integer
		 *                 message:
		 *                   type: array
		 *                   items:
		 *                     type: string
		 *                 data:
		 *                   type: object
		 *                   additionalProperties: true
		 *       400:
		 *         description: Bad request
		 *       404:
		 *         description: Not found
		 */
		this.router.get(
			'/data',
			this.dashboardController.getBatchData
		);


	}
}

export default DashboardRoute;
