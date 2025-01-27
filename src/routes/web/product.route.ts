import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import RoleMiddleware from '@/middlewares/role.middleware';
import { Role } from '@/utils/enum.utils';
import ProductController from '@/controllers/product.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateProductDto, UpdateProductDto } from '@/dtos/product.dto';

class ProductRoute implements Routes {
	public router = Router();
	public productController = new ProductController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(
			'/product',
			authMiddleware,
			this.router
		);

		/**
		 * @openapi
		 * /product/list:
		 *   get:
		 *     tags:
		 *       - Product
		 *     summary: Get list of products
		 *     description: Retrieves a list of products with pagination.
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
		 *         name: code
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: name
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: unit_size_id
		 *         required: false
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: unit_id
		 *         required: false
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: type_id
		 *         required: false
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved product list
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
			'/list',
			this.productController.getListProduct
		);

		/**
		 * @openapi
		 * /product/detail/{id}:
		 *   get:
		 *     tags:
		 *       - Product
		 *     summary: Get product details
		 *     description: Retrieves detailed information about a specific product.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved product details
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
			'/detail/:id',
			this.productController.getDetailProduct
		);

		/**
		 * @openapi
		 * /product/update/{id}:
		 *   put:
		 *     tags:
		 *       - Product
		 *     summary: Update product
		 *     description: Updates information of a specified product.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/UpdateProductSchemas'
		 *     responses:
		 *       200:
		 *         description: Successfully updated product
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
		 *       400:
		 *         description: Bad request
		 *       404:
		 *         description: Not found
		 */
		this.router.put(
			'/update/:id',
			RoleMiddleware({
				roles: [Role.WAREHOUSE_ADMIN],
			}),
			validationMiddleware(UpdateProductDto, 'body'),
			this.productController.updateProduct
		);

		/**
		 * @openapi
		 * /product/delete/{id}:
		 *   delete:
		 *     tags:
		 *       - Product
		 *     summary: Delete product
		 *     description: Deletes a specified product.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully deleted product
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
		 *       400:
		 *         description: Bad request
		 *       404:
		 *         description: Not found
		 */
		this.router.delete(
			'/delete/:id',
			RoleMiddleware({
				roles: [Role.WAREHOUSE_ADMIN],
			}),
			this.productController.deleteProduct
		);

		/**
		 * @openapi
		 * /product/create:
		 *   post:
		 *     tags:
		 *       - Product
		 *     summary: Create product
		 *     description: Creates a new product.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/CreateProductSchemas'
		 *     responses:
		 *       200:
		 *         description: Successfully created product
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
		 *       400:
		 *         description: Bad request
		 */
		this.router.post(
			'/create',
			RoleMiddleware({
				roles: [Role.WAREHOUSE_ADMIN],
			}),
			validationMiddleware(CreateProductDto, 'body'),
			this.productController.createProduct
		);

		/**
		 * @openapi
		 * /product/history/list:
		 *   get:
		 *     tags:
		 *       - Product History
		 *     summary: Get list of product history
		 *     description: Retrieves a list of product history records with pagination.
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
		 *         name: productId
		 *         required: false
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: deliveryOrderNumber
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: reason
		 *         required: false
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved product history list
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
			'/history/list',
			this.productController.getListProductHistory
		);

	}
}

export default ProductRoute;
