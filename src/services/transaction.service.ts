import DB from '@/databases';
import { Product } from '@/models/product.model';
import { Transaction as TransactionModel } from '@/models/transaction.model';
import { ResponseList } from '@/interfaces/ResponseList.interface';
import { FindOptions, Transaction } from 'sequelize';
import { HttpException } from '@/exceptions/HttpException';
import { TransactionItem } from '@/models/transaction_item.model';

class TransactionService {
	public User = DB.User;
	public Product = DB.Product;
	public Unit = DB.Unit;
	public UnitSize = DB.UnitSize;
	public Type = DB.Type;
	public Transaction = DB.Transaction;
	public TransactionItem = DB.TransactionItem;

	public async getListTransaction(
		page: number,
		dataPerPage: number,
		query: any
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				limit: dataPerPage,
				offset: offset,
			};

			if (query.search) {
				condition.where = {
					[DB.Sequelize.Op.or]: [
						{
							name: {
								[DB.Sequelize.Op.iLike]: `%${query.search}%`,
							},
							deliveryOrderNumber: {
								[DB.Sequelize.Op.iLike]: `%${query.search}%`,
							},
						},
					],
				};
			}

			if (query.deliveryOrderNumber) {
				condition.where = {
					...condition.where,
					deliveryOrderNumber: query.deliveryOrderNumber,
				};
			}

			if (query.organizerName) {
				condition.where = {
					...condition.where,
					organizerName: query.organizerName,
				};
			}

			if (query.approvalName) {
				condition.where = {
					...condition.where,
					approvalName: query.approvalName,
				};
			}
			if (query.senderName) {
				condition.where = {
					...condition.where,
					senderName: query.senderName,
				};
			}
			if (query.recipientName) {
				condition.where = {
					...condition.where,
					recipientName: query.recipientName,
				};
			}

			if (query.totalQuantity) {
				condition.where = {
					...condition.where,
					totalQuantity: query.totalQuantity,
				};
			}

			const { count, rows }: any = await this.Transaction.findAndCountAll(condition);

			const next = page * dataPerPage < count

			const pageTotal = Math.ceil(count / dataPerPage);

			return {
				data: rows,
				page: page,
				dataPerPage: dataPerPage,
				count: count,
				next: next,
				pageTotal: pageTotal,
				totalCount: count,
			};
		} catch (error) {
			throw error;
		}
	}

	public async getTransactionById(id: number): Promise<TransactionModel> {
		try {
			const transaction: TransactionModel = await this.Transaction.findOne({
				where: {id: id}
			});

			if (!transaction) {
				throw new HttpException(404, 'Transaksi tidak ditemukan');
			}

			return transaction;
		} catch (error) {
			throw error;
		}
	}

	public async createTransaction(
		data: any,
		transaction: Transaction = null
	): Promise<TransactionModel> {
		try {
			const transactionData = {
				deliveryOrderNumber: data.deliveryOrderNumber,
				organizerName: data.organizerName,
				approvalName: data.approvalName,
				senderName: data.senderName,
				recipientName: data.recipientName,
				totalQuantity: 0, // Initialize total quantity
			};

			const newTransaction: TransactionModel = await this.Transaction.create(transactionData, {
				...(transaction ? { transaction } : {}),
			});

			return newTransaction;
		} catch (error) {
			throw error;
		}
	}

	public async updateTransaction(id: number, data: any): Promise<any> {
		const transaction: Transaction = await DB.sequelize.transaction();
		try {
			const existingTransaction: TransactionModel = await this.getTransactionById(id);

			const transactionUpdates = {
				deliveryOrderNumber: data.deliveryOrderNumber || existingTransaction.deliveryOrderNumber,
				organizerName: data.organizerName || existingTransaction.organizerName,
				approvalName: data.approvalName || existingTransaction.approvalName,
				senderName: data.senderName || existingTransaction.senderName,
				recipientName: data.recipientName || existingTransaction.recipientName,
			};

			Object.keys(transactionUpdates).forEach((key) => {
				if (transactionUpdates[key] === null || transactionUpdates[key] === undefined) {
					delete transactionUpdates[key];
				}
			});

			await this.Transaction.update(transactionUpdates, {
				where: {
					id: id,
				},
				transaction: transaction,
			});

			await transaction.commit();

			return transactionUpdates;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	public async deleteTransaction(id: number): Promise<TransactionModel> {
		const t: Transaction = await DB.sequelize.transaction();
		try {
			const transaction: TransactionModel = await this.getTransactionById(id);

			if (!transaction) {
				throw new HttpException(404, 'Transaksi tidak ditemukan');
			}

			const transactionItems = await this.TransactionItem.findAll({
				where: {
					transactionId: transaction.id,
				},
			});

			for (const item of transactionItems) {
				const product: Product = await this.Product.findOne({
					where: {
						code: item.productCode,
					},
					attributes: ['id', 'quantity']
				});

				if (!product) {
					throw new HttpException(404, `Produk dengan kode ${item.productCode} tidak ditemukan`);
				}

				product.quantity += item.quantity;

				await this.Product.update({ quantity: product.quantity }, {
					where: { id: product.id },
					transaction: t,
				});

				await DB.ProductHistory.create({
					productId: product.id,
					deliveryOrderNumber: transaction.deliveryOrderNumber,
					quantityChange: item.quantity,
					reason: 'Deleted transaction',
					timestamp: new Date()
				}, { transaction: t });
			}

			await this.TransactionItem.destroy({
				where: {
					transactionId: transaction.id,
				},
				transaction: t,
			});

			await this.Transaction.destroy({
				where: {
					id: id,
				},
				transaction: t,
			});

			await t.commit();
			return transaction;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}


	public async addItem(id: number, data: any): Promise<any> {
		const t: Transaction = await DB.sequelize.transaction();
		try {
			const transaction: TransactionModel = await this.getTransactionById(id);

			if (!transaction) {
				throw new HttpException(404, 'Transaksi tidak ditemukan');
			}

			const product: Product = await this.Product.findOne({
				where: {
					code: data.productCode,
				},
				attributes: ['id', 'quantity']
			});

			if (!product) {
				throw new HttpException(404, 'Produk tidak ditemukan');
			}

			if (product.quantity < data.quantity) {
				throw new HttpException(400, `Kuantitas produk tidak mencukupi, sisa: ${product.quantity}`);
			}

			const item = {
				transactionId: transaction.id,
				productCode: data.productCode,
				quantity: data.quantity
			};

			await this.TransactionItem.create(item, { transaction: t });

			transaction.totalQuantity += data.quantity;
			await this.Transaction.update({ totalQuantity: transaction.totalQuantity }, {
				where: { id: transaction.id },
				transaction: t,
			});

			product.quantity -= data.quantity;
			await this.Product.update({ quantity: product.quantity }, {
				where: { id: product.id },
				transaction: t,
			});

			await DB.ProductHistory.create({
				productId: product.id,
				deliveryOrderNumber: transaction.deliveryOrderNumber,
				quantityChange: -data.quantity,
				reason: 'Added to transaction',
				timestamp: new Date()
			}, { transaction: t });

			await t.commit();
			return transaction;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}


	public async updateItem(transactionId: number, productCode: string, data: any): Promise<any> {
		const t: Transaction = await DB.sequelize.transaction();
		try {
			const transaction: TransactionModel = await this.getTransactionById(transactionId);

			if (!transaction) {
				throw new HttpException(404, 'Transaksi tidak ditemukan');
			}

			const existingItem = await this.TransactionItem.findOne({
				where: {
					transactionId: transaction.id,
					productCode: productCode,
				},
			});

			if (!existingItem) {
				throw new HttpException(404, 'Item tidak ditemukan dalam transaksi');
			}

			const existingProduct: Product = await this.Product.findOne({
				where: {
					code: existingItem.productCode,
				},
				attributes: ['id', 'quantity']
			});

			if (!existingProduct) {
				throw new HttpException(404, 'Produk tidak ditemukan');
			}

			let newProduct: Product | null = null;
			if (data.productCode && data.productCode !== existingItem.productCode) {
				newProduct = await this.Product.findOne({
					where: {
						code: data.productCode,
					},
					attributes: ['id', 'quantity']
				});

				if (!newProduct) {
					throw new HttpException(404, 'Produk baru tidak ditemukan');
				}
			}

			const quantityDifference = data.quantity - existingItem.quantity;

			if (newProduct && newProduct.quantity < quantityDifference) {
				throw new HttpException(400, `Kuantitas produk tidak mencukupi, sisa: ${newProduct.quantity}`);
			}

			await this.TransactionItem.update(
				{
					quantity: data.quantity,
					productCode: newProduct ? data.productCode : existingItem.productCode,
				},
				{
					where: {
						transactionId: transaction.id,
						productCode: productCode,
					},
					transaction: t,
				}
			);

			transaction.totalQuantity += quantityDifference;
			await this.Transaction.update(
				{ totalQuantity: transaction.totalQuantity },
				{
					where: { id: transaction.id },
					transaction: t,
				}
			);

			existingProduct.quantity += existingItem.quantity;
			await this.Product.update(
				{ quantity: existingProduct.quantity },
				{
					where: { id: existingProduct.id },
					transaction: t,
				}
			);

			if (newProduct) {
				newProduct.quantity -= data.quantity;
				await this.Product.update(
					{ quantity: newProduct.quantity },
					{
						where: { id: newProduct.id },
						transaction: t,
					}
				);

				await DB.ProductHistory.create({
					productId: newProduct.id,
					deliveryOrderNumber: transaction.deliveryOrderNumber,
					quantityChange: -data.quantity,
					reason: 'Updated item in transaction',
					timestamp: new Date()
				}, { transaction: t });
			}

			await DB.ProductHistory.create({
				productId: existingProduct.id,
				deliveryOrderNumber: transaction.deliveryOrderNumber,
				quantityChange: quantityDifference,
				reason: 'Updated item in transaction',
				timestamp: new Date()
			}, { transaction: t });

			await t.commit();
			return transaction;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}



	public async deleteItem(id: number, productCode: string): Promise<any> {
		const t: Transaction = await DB.sequelize.transaction();
		try {
			const transaction: TransactionModel = await this.getTransactionById(id);

			if (!transaction) {
				throw new HttpException(404, 'Transaksi tidak ditemukan');
			}

			const itemToDelete = await this.TransactionItem.findOne({
				where: {
					transactionId: transaction.id,
					productCode: productCode,
				}
			});

			if (!itemToDelete) {
				throw new HttpException(404, 'Item tidak ditemukan dalam transaksi');
			}

			await this.TransactionItem.destroy({
				where: {
					transactionId: transaction.id,
					productCode: productCode,
				},
				transaction: t,
			});

			const sumTransactionItem = await this.TransactionItem.sum('quantity', {
				where: {
					transactionId: transaction.id
				},
				transaction: t
			})

			await this.Transaction.update({ totalQuantity: (sumTransactionItem ?? 0) }, {
				where: { id: transaction.id },
				transaction: t,
			});

			const product: Product = await this.Product.findOne({
				where: {
					code: productCode,
				},
				attributes: ['id', 'quantity']
			});

			if (!product) {
				throw new HttpException(404, 'Produk tidak ditemukan');
			}

			product.quantity += itemToDelete.quantity;
			await this.Product.update({ quantity: product.quantity }, {
				where: { id: product.id },
				transaction: t,
			});

			await DB.ProductHistory.create({
				productId: product.id,
				deliveryOrderNumber: transaction.deliveryOrderNumber,
				quantityChange: itemToDelete.quantity,
				reason: 'Deleted item from transaction',
				timestamp: new Date()
			}, { transaction: t });



			await t.commit();
			return transaction;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}



	public async getDetailItem(id: string): Promise<TransactionItem> {
		try {
			const transactionItem: TransactionItem = await this.TransactionItem.findByPk(id, {
				include: [
					{
						model: DB.Product,
						as: 'product',
						attributes: {
							exclude: ['createdAt', 'updatedAt'],
						},
						include: [
							{
								model: DB.Type,
								as: 'type',
								attributes: ['id', 'name'],
							},
							{
								model: DB.Unit,
								as: 'unit',
								attributes: ['id', 'name'],
							},
							{
								model: DB.UnitSize,
								as: 'unit_size',
								attributes: ['id', 'name'],
							},
						],
					},
					{
						model: DB.Transaction,
						as: 'transaction',
						attributes: {
							exclude: ['createdAt', 'updatedAt'],
						},
					},
				]
			});

			if (!transactionItem) {
				throw new HttpException(404, 'Item tidak ditemukan');
			}
			return transactionItem;
		} catch (error) {
			throw error;
		}
	}

	public async getTransactionItems(
		id: number,
		page: number,
		dataPerPage: number,
		query: any
	): Promise<ResponseList> {
		try {
			const offset = (page - 1) * dataPerPage;
			const whereConditions: any = { transactionId: id };

			const condition: FindOptions = {
				include: [
					{
						model: DB.Product,
						as: 'product',
						attributes: {
							exclude: ['createdAt', 'updatedAt'],
						},
						include: [
							{
								model: DB.Type,
								as: 'type',
								attributes: ['id', 'name'],
							},
							{
								model: DB.Unit,
								as: 'unit',
								attributes: ['id', 'name'],
							},
							{
								model: DB.UnitSize,
								as: 'unit_size',
								attributes: ['id', 'name'],
							},
						],
					},
				],
				where: whereConditions,
				limit: dataPerPage,
				offset: offset,
			};

			if (query.search) {
				whereConditions[DB.Sequelize.Op.or] = [
					{
						name: {
							[DB.Sequelize.Op.iLike]: `%${query.search}%`,
						},
					},
					{
						code: {
							[DB.Sequelize.Op.iLike]: `%${query.search}%`,
						},
					},
				];
			}

			if (query.code) {
				condition.where = {
					...condition.where,
					'$product.code$': query.code,
				};
			}

			if (query.name) {
				condition.where = {
					...condition.where,
					'$product.name$': query.name,
				};
			}

			if (query.unit_size_id) {
				condition.where = {
					...condition.where,
					'$product.unit_size_id$': query.unit_size_id,
				};
			}

			if (query.unit_id) {
				condition.where = {
					...condition.where,
					'$product.unit_id$': query.unit_id,
				};
			}

			if (query.type_id) {
				condition.where = {
					...condition.where,
					'$product.type_id$': query.type_id,
				};
			}

			const { count, rows }: any = await this.TransactionItem.findAndCountAll(condition);

			const next = page * dataPerPage < count;
			const pageTotal = Math.ceil(count / dataPerPage);

			return {
				data: rows,
				page: page,
				dataPerPage: dataPerPage,
				count: count,
				next: next,
				pageTotal: pageTotal,
				totalCount: count,
			};

		} catch (error) {
			throw error;
		}
	}

}

export default TransactionService;
