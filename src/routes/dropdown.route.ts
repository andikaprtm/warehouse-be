import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import DropdownController from '@/controllers/dropdown.controller';

class DropdownRoute implements Routes {
  public router = Router();
  public DropdownController = new DropdownController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
			this.router.use(
				'/dropdown',
				authMiddleware,
				this.router
			);

			/**
			 * @openapi
			 * '/dropdown/unit/list':
			 *   get:
			 *     tags:
			 *       - Dropdown
			 *     parameters:
			 *       - in: query
			 *         name: page
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: dataPerPage
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: search
			 *         required: false
			 *         schema:
			 *           type: string
			 *       - in: query
			 *         name: unit_size_id
			 *         required: false
			 *         schema:
			 *           type: integer
			 *     responses:
			 *       200:
			 *         description: List of dropdown retrieved successfully.
			 */
			this.router.get('/unit/list', this.DropdownController.getUnitDropdownList);

			/**
			 * @openapi
			 * '/dropdown/unit-size/list':
			 *   get:
			 *     tags:
			 *       - Dropdown
			 *     parameters:
			 *       - in: query
			 *         name: page
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: dataPerPage
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: search
			 *         required: false
			 *         schema:
			 *           type: string
			 *       - in: query
			 *         name: unit_id
			 *         required: false
			 *         schema:
			 *           type: integer
			 *     responses:
			 *       200:
			 *         description: List of dropdown retrieved successfully.
			 */
			this.router.get('/unit-size/list', this.DropdownController.getUnitSizeDropdownList);

			/**
			 * @openapi
			 * '/dropdown/type/list':
			 *   get:
			 *     tags:
			 *       - Dropdown
			 *     parameters:
			 *       - in: query
			 *         name: page
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: dataPerPage
			 *         required: true
			 *         schema:
			 *           type: integer
			 *       - in: query
			 *         name: search
			 *         required: false
			 *         schema:
			 *           type: string
			 *     responses:
			 *       200:
			 *         description: List of dropdown retrieved successfully.
			 */
			this.router.get('/type/list', this.DropdownController.getTypeDropdownList);

			

		}
}

export default DropdownRoute;
