import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import RoleMiddleware from '@/middlewares/role.middleware';
import { Role } from '@/utils/enum.utils';
import TransactionController from '@/controllers/transaction.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateTransactionDto, CreateTransactionItemDto, UpdateTransactionDto, UpdateTransactionItemDto } from '@/dtos/transaction.dto';

class TransactionRoute implements Routes {
	public router = Router();
	public transactionController = new TransactionController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(
			'/transaction',
			authMiddleware,
			this.router
		);

		/**
		 * @openapi
		 * /transaction/list:
		 *   get:
		 *     tags:
		 *       - Transaction
		 *     summary: Get list of transactions
		 *     description: Retrieves a list of transactions with pagination.
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
		 *         name: deliveryOrderNumber
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: organizerName
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: approvalName
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: senderName
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: recipientName
		 *         required: false
		 *         schema:
		 *           type: string
		 *       - in: query
		 *         name: totalQuantity
		 *         required: false
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved transaction list
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
			this.transactionController.getListTransaction
		);

		/**
		 * @openapi
		 * /transaction/detail/{id}:
		 *   get:
		 *     tags:
		 *       - Transaction
		 *     summary: Get transaction details
		 *     description: Retrieves detailed information about a specific transaction.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved transaction details
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
			this.transactionController.getTransactionDetail
		);

		/**
		 * @openapi
		 * /transaction/create:
		 *   post:
		 *     tags:
		 *       - Transaction
		 *     summary: Create transaction
		 *     description: Creates a new transaction.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/CreateTransactionSchemas'
		 *     responses:
		 *       201:
		 *         description: Successfully created transaction
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
			validationMiddleware(CreateTransactionDto, 'body'),
			this.transactionController.createTransaction
		);

		/**
		 * @openapi
		 * /transaction/update/{id}:
		 *   put:
		 *     tags:
		 *       - Transaction
		 *     summary: Update transaction
		 *     description: Updates information of a specified transaction.
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
		 *             $ref: '#/components/schemas/UpdateTransactionSchemas'
		 *     responses:
		 *       200:
		 *         description: Successfully updated transaction
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
			validationMiddleware(UpdateTransactionDto, 'body'),
			this.transactionController.updateTransaction
		);

		/**
		 * @openapi
		 * /transaction/delete/{id}:
		 *   delete:
		 *     tags:
		 *       - Transaction
		 *     summary: Delete transaction
		 *     description: Deletes a specified transaction.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully deleted transaction
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
			this.transactionController.deleteTransaction
		);

		/**
		 * @openapi
		 * /transaction/{id}/add-item:
		 *   post:
		 *     tags:
		 *       - Transaction
		 *     summary: Add item to transaction
		 *     description: Adds an item to a specified transaction.
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
		 *             type: object
		 *             properties:
		 *               productCode:
		 *                 type: string
		 *               quantity:
		 *                 type: integer
		 *     responses:
		 *       200:
		 *         description: Successfully added item to transaction
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
		this.router.post(
			'/:id/add-item',
			validationMiddleware(CreateTransactionItemDto, 'body'),
			this.transactionController.addItem
		);

		/**
		 * @openapi
		 * /transaction/{id}/update-item/{productCode}:
		 *   put:
		 *     tags:
		 *       - Transaction
		 *     summary: Update item in transaction
		 *     description: Updates the quantity and/or product code of an item in a specified transaction.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         description: The ID of the transaction.
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: productCode
		 *         required: true
		 *         description: The code of the product to be updated.
		 *         schema:
		 *           type: string
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/UpdateTransactionItemSchemas'  # Reference to the DTO schema
		 *     responses:
		 *       200:
		 *         description: Successfully updated item
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
		this.router.put('/:id/update-item/:productCode',
			validationMiddleware(UpdateTransactionItemDto, 'body'),
			this.transactionController.updateItem
		);


		/**
		 * @openapi
		 * /transaction/{id}/delete-item/{productCode}:
		 *   delete:
		 *     tags:
		 *       - Transaction
		 *     summary: Delete item from transaction
		 *     description: Deletes an item from a specified transaction.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: productCode
		 *         required: true
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Successfully deleted item from transaction
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
			'/:id/delete-item/:productCode',
			this.transactionController.deleteItem
		);

		/**
		 * @openapi
		 * /transaction/item/detail/{itemId}:
		 *   get:
		 *     tags:
		 *       - Transaction
		 *     summary: Get transaction item details
		 *     description: Retrieves detailed information about a specific transaction item.
		 *     parameters:
		 *       - in: path
		 *         name: itemId
		 *         required: true
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved transaction item details
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
			'/item/detail/:itemId',
			this.transactionController.getDetailItem
		);

		/**
		 * @openapi
		 * /transaction/{id}/items:
		 *   get:
		 *     tags:
		 *       - Transaction
		 *     summary: Get items of a transaction
		 *     description: Retrieves a list of items for a specified transaction.
		 *     parameters:
		 *       - in: path
		 *         name: id
		 *         required: true
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: page
		 *         required: false
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: dataPerPage
		 *         required: false
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: search
		 *         required: false
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Successfully retrieved transaction items
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
			'/:id/items',
			this.transactionController.getTransactionItems
		);
	}
}

export default TransactionRoute;
