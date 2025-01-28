"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
const HttpException_1 = require("../exceptions/HttpException");
class ProductService {
    constructor() {
        this.User = databases_1.default.User;
        this.Product = databases_1.default.Product;
        this.Unit = databases_1.default.Unit;
        this.UnitSize = databases_1.default.UnitSize;
        this.Type = databases_1.default.Type;
        this.ProductHistory = databases_1.default.ProductHistory;
    }
    async getListProduct(page, dataPerPage, query) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                include: [
                    {
                        model: databases_1.default.Type,
                        as: 'type',
                        attributes: ['id', 'name']
                    },
                    {
                        model: databases_1.default.Unit,
                        as: 'unit',
                        attributes: ['id', 'name']
                    },
                    {
                        model: databases_1.default.UnitSize,
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
                    [databases_1.default.Sequelize.Op.or]: [
                        {
                            name: {
                                [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                            },
                            code: {
                                [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                            },
                        },
                    ],
                };
            }
            if (query.code) {
                condition.where = Object.assign(Object.assign({}, condition.where), { code: query.code });
            }
            if (query.name) {
                condition.where = Object.assign(Object.assign({}, condition.where), { name: query.name });
            }
            if (query.unit_size_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { unit_size_id: query.unit_size_id });
            }
            if (query.unit_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { unit_id: query.unit_id });
            }
            if (query.type_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { type_id: query.type_id });
            }
            const { count, rows } = await this.Product.findAndCountAll(condition);
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
        }
        catch (error) {
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const product = await this.Product.findByPk(id, {
                include: [
                    {
                        model: databases_1.default.Type,
                        as: 'type',
                        attributes: ['id', 'name']
                    },
                    {
                        model: databases_1.default.Unit,
                        as: 'unit',
                        attributes: ['id', 'name']
                    },
                    {
                        model: databases_1.default.UnitSize,
                        as: 'unit_size',
                        attributes: ['id', 'name']
                    }
                ],
            });
            if (!product) {
                throw new HttpException_1.HttpException(404, 'Produk tidak ditemukan');
            }
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async createProduct(data, transaction = null) {
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
                throw new HttpException_1.HttpException(400, 'Unit ID does not exist.');
            }
            if (!unitSizeExists) {
                throw new HttpException_1.HttpException(400, 'Unit Size ID does not exist.');
            }
            if (!typeExists) {
                throw new HttpException_1.HttpException(400, 'Type ID does not exist.');
            }
            if (codeExists) {
                throw new HttpException_1.HttpException(400, 'Product code already exists.');
            }
            const product = await this.Product.create(productData, Object.assign(Object.assign({}, (transaction ? { transaction } : {})), { returning: true }));
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async updateProduct(id, data) {
        const transaction = await databases_1.default.sequelize.transaction();
        try {
            const existingProduct = await this.getProductById(id);
            const productUpdates = {
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
                throw new HttpException_1.HttpException(400, 'Unit ID does not exist.');
            }
            if (!unitSizeExists) {
                throw new HttpException_1.HttpException(400, 'Unit Size ID does not exist.');
            }
            if (!typeExists) {
                throw new HttpException_1.HttpException(400, 'Type ID does not exist.');
            }
            if (codeExists) {
                throw new HttpException_1.HttpException(400, 'Product code already exists.');
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
            return Object.assign(Object.assign({}, existingProduct), productUpdates);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await this.getProductById(id);
            if (!product) {
                throw new HttpException_1.HttpException(404, 'Produk tidak ditemukan');
            }
            await this.Product.destroy({
                where: {
                    id: id,
                },
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async getListProductHistory(page, dataPerPage, query) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                include: [
                    {
                        model: databases_1.default.Product,
                        as: 'product',
                        attributes: ['id', 'code', 'name']
                    }
                ],
                limit: dataPerPage,
                offset: offset,
                order: [['timestamp', 'DESC']],
            };
            if (query.productId) {
                condition.where = Object.assign(Object.assign({}, condition.where), { productId: query.productId });
            }
            if (query.deliveryOrderNumber) {
                condition.where = Object.assign(Object.assign({}, condition.where), { deliveryOrderNumber: query.deliveryOrderNumber });
            }
            if (query.reason) {
                condition.where = Object.assign(Object.assign({}, condition.where), { reason: {
                        [databases_1.default.Sequelize.Op.iLike]: `%${query.reason}%`,
                    } });
            }
            const { count, rows } = await this.ProductHistory.findAndCountAll(condition);
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
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map