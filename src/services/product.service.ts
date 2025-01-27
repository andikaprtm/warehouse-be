import DB from '@/databases';
import { Product } from '@/models/product.model';
import { ResponseList } from '@/interfaces/ResponseList.interface';
import { FindOptions, Transaction } from 'sequelize';
import { HttpException } from '@/exceptions/HttpException';

class ProductService {
	public User = DB.User;
	public Product = DB.Product;
	public Unit = DB.Unit;
	public UnitSize = DB.UnitSize;
	public Type = DB.Type;
	public ProductHistory = DB.ProductHistory;

	public async getListProduct(
		page: number,
		dataPerPage: number,
		query: any
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				include: [
					{
						model: DB.Type,
						as: 'type',
						attributes: ['id', 'name']
					},
					{
						model: DB.Unit,
						as: 'unit',
						attributes: ['id', 'name']
					},
					{
						model: DB.UnitSize,
						as: 'unit_size',
						attributes: ['id', 'name']
					}
				],
				limit: dataPerPage,
				offset: offset,
				order: [['updated_at', 'DESC']]
			};

			if (query.search) {
				condition.where = {
					[DB.Sequelize.Op.or]: [
						{
							name: {
								[DB.Sequelize.Op.iLike]: `%${query.search}%`,
							},
							code: {
								[DB.Sequelize.Op.iLike]: `%${query.search}%`,
							},
						},
					],
				};
			}

			if (query.code) {
				condition.where = {
					...condition.where,
					code: query.code,
				};
			}

			if (query.name) {
				condition.where = {
					...condition.where,
					name: query.name,
				};
			}

			if (query.unit_size_id) {
				condition.where = {
					...condition.where,
					unit_size_id: query.unit_size_id,
				};
			}
			if (query.unit_id) {
				condition.where = {
					...condition.where,
					unit_id: query.unit_id,
				};
			}
			if (query.type_id) {
				condition.where = {
					...condition.where,
					type_id: query.type_id,
				};
			}

			const { count, rows }: any = await this.Product.findAndCountAll(condition);

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

	public async getProductById(id: number): Promise<Product> {
		try {
			const product: Product = await this.Product.findByPk(id, {
				include: [
					{
						model: DB.Type,
						as: 'type',
						attributes: ['id', 'name']
					},
					{
						model: DB.Unit,
						as: 'unit',
						attributes: ['id', 'name']
					},
					{
						model: DB.UnitSize,
						as: 'unit_size',
						attributes: ['id', 'name']
					}
				],
			});

			if (!product) {
				throw new HttpException(404, 'Produk tidak ditemukan');
			}

			return product;
		} catch (error) {
			throw error;
		}
	}

	public async createProduct(
		data: any,
		transaction: Transaction = null
	): Promise<Product> {
		try {
			const productData = {
				code: data.code,
				name: data.name,
				unitSizeId: data.unitSizeId,
				unitId: data.unitId,
				typeId: data.typeId,
				quantity: data.quantity,
			};

			const unitExists = await this.Unit.findByPk(data.unitId);
			const unitSizeExists = await this.UnitSize.findByPk(data.unitSizeId);
			const typeExists = await this.Type.findByPk(data.typeId);
			const codeExists = await this.Product.findOne({ where: { code: data.code } });

			if (!unitExists) {
				throw new HttpException(400, 'Unit ID does not exist.');
			}
			if (!unitSizeExists) {
				throw new HttpException(400, 'Unit Size ID does not exist.');
			}
			if (!typeExists) {
				throw new HttpException(400, 'Type ID does not exist.');
			}
			if (codeExists) {
				throw new HttpException(400, 'Product code already exists.');
			}

			const product: Product = await this.Product.create(productData, {
				...(transaction ? { transaction } : {}),
				returning: true,
			});


			return product;
		} catch (error) {
			throw error;
		}
	}

	public async updateProduct(id: number, data: any): Promise<Product> {
		const transaction: Transaction = await DB.sequelize.transaction();
		try {
			const existingProduct: Product = await this.getProductById(id);

			const productUpdates: any = {
				code: data.code || existingProduct.code,
				name: data.name || existingProduct.name,
				unitSizeId: data.unitSizeId || existingProduct.unitSizeId,
				unitId: data.unitId || existingProduct.unitId,
				typeId: data.typeId || existingProduct.typeId,
				quantity: data.quantity !== undefined ? data.quantity : existingProduct.quantity, // Allow quantity update
			};

			Object.keys(productUpdates).forEach((key) => {
				if (productUpdates[key] === null || productUpdates[key] === undefined) {
					delete productUpdates[key];
				}
			});

			const unitExists = await this.Unit.findByPk(productUpdates.unitId);
			const unitSizeExists = await this.UnitSize.findByPk(productUpdates.unitSizeId);
			const typeExists = await this.Type.findByPk(productUpdates.typeId);

			const codeExists = productUpdates.code !== existingProduct.code
				? await this.Product.findOne({ where: { code: productUpdates.code } })
				: null;

			if (!unitExists) {
				throw new HttpException(400, 'Unit ID does not exist.');
			}
			if (!unitSizeExists) {
				throw new HttpException(400, 'Unit Size ID does not exist.');
			}
			if (!typeExists) {
				throw new HttpException(400, 'Type ID does not exist.');
			}
			if (codeExists) {
				throw new HttpException(400, 'Product code already exists.');
			}

			if (data.quantity !== undefined && data.quantity !== existingProduct.quantity) {
				const quantityChange = data.quantity - existingProduct.quantity;

				await this.ProductHistory.create({
					productId: existingProduct.id,
					deliveryOrderNumber: null,
					quantityChange: quantityChange,
					reason: 'Updated product quantity',
					timestamp: new Date()
				}, { transaction: transaction });
			}

			await this.Product.update(productUpdates, {
				where: {
					id: id,
				},
				transaction: transaction,
			});

			await transaction.commit();

			return { ...existingProduct, ...productUpdates };
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	public async deleteProduct(id: number): Promise<Product> {
		try {
			const product: Product = await this.getProductById(id);

			if (!product) {
				throw new HttpException(404, 'Produk tidak ditemukan');
			}

			await this.Product.destroy({
				where: {
					id: id,
				},
			});

			return product;
		} catch (error) {
			throw error;
		}
	}

	public async getListProductHistory(
		page: number,
		dataPerPage: number,
		query: any
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				include: [
					{
						model: DB.Product, 
						as: 'product',
						attributes: ['id', 'code', 'name']
					}
				],
				limit: dataPerPage,
				offset: offset,
				order: [['timestamp', 'DESC']],
			};

			if (query.productId) {
				condition.where = {
					...condition.where,
					productId: query.productId,
				};
			}

			if (query.deliveryOrderNumber) {
				condition.where = {
					...condition.where,
					deliveryOrderNumber: query.deliveryOrderNumber,
				};
			}

			if (query.reason) {
				condition.where = {
					...condition.where,
					reason: {
						[DB.Sequelize.Op.iLike]: `%${query.reason}%`, 
					},
				};
			}

			const { count, rows }: any = await this.ProductHistory.findAndCountAll(condition);

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

export default ProductService;
