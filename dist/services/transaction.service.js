"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
const HttpException_1 = require("../exceptions/HttpException");
class TransactionService {
    constructor() {
        this.User = databases_1.default.User;
        this.Product = databases_1.default.Product;
        this.Unit = databases_1.default.Unit;
        this.UnitSize = databases_1.default.UnitSize;
        this.Type = databases_1.default.Type;
        this.Transaction = databases_1.default.Transaction;
        this.TransactionItem = databases_1.default.TransactionItem;
    }
    async getListTransaction(page, dataPerPage, query) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                limit: dataPerPage,
                offset: offset,
            };
            if (query.search) {
                condition.where = {
                    [databases_1.default.Sequelize.Op.or]: [
                        {
                            name: {
                                [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                            },
                            deliveryOrderNumber: {
                                [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                            },
                        },
                    ],
                };
            }
            if (query.deliveryOrderNumber) {
                condition.where = Object.assign(Object.assign({}, condition.where), { deliveryOrderNumber: query.deliveryOrderNumber });
            }
            if (query.organizerName) {
                condition.where = Object.assign(Object.assign({}, condition.where), { organizerName: query.organizerName });
            }
            if (query.approvalName) {
                condition.where = Object.assign(Object.assign({}, condition.where), { approvalName: query.approvalName });
            }
            if (query.senderName) {
                condition.where = Object.assign(Object.assign({}, condition.where), { senderName: query.senderName });
            }
            if (query.recipientName) {
                condition.where = Object.assign(Object.assign({}, condition.where), { recipientName: query.recipientName });
            }
            if (query.totalQuantity) {
                condition.where = Object.assign(Object.assign({}, condition.where), { totalQuantity: query.totalQuantity });
            }
            const { count, rows } = await this.Transaction.findAndCountAll(condition);
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
    async getTransactionById(id) {
        try {
            const transaction = await this.Transaction.findOne({
                where: { id: id }
            });
            if (!transaction) {
                throw new HttpException_1.HttpException(404, 'Transaksi tidak ditemukan');
            }
            return transaction;
        }
        catch (error) {
            throw error;
        }
    }
    async createTransaction(data, transaction = null) {
        try {
            const transactionData = {
                deliveryOrderNumber: data.deliveryOrderNumber,
                organizerName: data.organizerName,
                approvalName: data.approvalName,
                senderName: data.senderName,
                recipientName: data.recipientName,
                totalQuantity: 0, // Initialize total quantity
            };
            const newTransaction = await this.Transaction.create(transactionData, Object.assign({}, (transaction ? { transaction } : {})));
            return newTransaction;
        }
        catch (error) {
            throw error;
        }
    }
    async updateTransaction(id, data) {
        const transaction = await databases_1.default.sequelize.transaction();
        try {
            const existingTransaction = await this.getTransactionById(id);
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
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async deleteTransaction(id) {
        const t = await databases_1.default.sequelize.transaction();
        try {
            const transaction = await this.getTransactionById(id);
            if (!transaction) {
                throw new HttpException_1.HttpException(404, 'Transaksi tidak ditemukan');
            }
            const transactionItems = await this.TransactionItem.findAll({
                where: {
                    transactionId: transaction.id,
                },
            });
            for (const item of transactionItems) {
                const product = await this.Product.findOne({
                    where: {
                        code: item.productCode,
                    },
                    attributes: ['id', 'quantity']
                });
                if (!product) {
                    throw new HttpException_1.HttpException(404, `Produk dengan kode ${item.productCode} tidak ditemukan`);
                }
                product.quantity += item.quantity;
                await this.Product.update({ quantity: product.quantity }, {
                    where: { id: product.id },
                    transaction: t,
                });
                await databases_1.default.ProductHistory.create({
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
        }
        catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async addItem(id, data) {
        const t = await databases_1.default.sequelize.transaction();
        try {
            const transaction = await this.getTransactionById(id);
            if (!transaction) {
                throw new HttpException_1.HttpException(404, 'Transaksi tidak ditemukan');
            }
            const product = await this.Product.findOne({
                where: {
                    code: data.productCode,
                },
                attributes: ['id', 'quantity']
            });
            if (!product) {
                throw new HttpException_1.HttpException(404, 'Produk tidak ditemukan');
            }
            if (product.quantity < data.quantity) {
                throw new HttpException_1.HttpException(400, `Kuantitas produk tidak mencukupi, sisa: ${product.quantity}`);
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
            await databases_1.default.ProductHistory.create({
                productId: product.id,
                deliveryOrderNumber: transaction.deliveryOrderNumber,
                quantityChange: -data.quantity,
                reason: 'Added to transaction',
                timestamp: new Date()
            }, { transaction: t });
            await t.commit();
            return transaction;
        }
        catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async updateItem(transactionId, productCode, data) {
        const t = await databases_1.default.sequelize.transaction();
        try {
            const transaction = await this.getTransactionById(transactionId);
            if (!transaction) {
                throw new HttpException_1.HttpException(404, 'Transaksi tidak ditemukan');
            }
            const existingItem = await this.TransactionItem.findOne({
                where: {
                    transactionId: transaction.id,
                    productCode: productCode,
                },
            });
            if (!existingItem) {
                throw new HttpException_1.HttpException(404, 'Item tidak ditemukan dalam transaksi');
            }
            const existingProduct = await this.Product.findOne({
                where: {
                    code: existingItem.productCode,
                },
                attributes: ['id', 'quantity']
            });
            if (!existingProduct) {
                throw new HttpException_1.HttpException(404, 'Produk tidak ditemukan');
            }
            let newProduct = null;
            if (data.productCode && data.productCode !== existingItem.productCode) {
                newProduct = await this.Product.findOne({
                    where: {
                        code: data.productCode,
                    },
                    attributes: ['id', 'quantity']
                });
                if (!newProduct) {
                    throw new HttpException_1.HttpException(404, 'Produk baru tidak ditemukan');
                }
            }
            const quantityDifference = data.quantity - existingItem.quantity;
            if (newProduct && newProduct.quantity < quantityDifference) {
                throw new HttpException_1.HttpException(400, `Kuantitas produk tidak mencukupi, sisa: ${newProduct.quantity}`);
            }
            await this.TransactionItem.update({
                quantity: data.quantity,
                productCode: newProduct ? data.productCode : existingItem.productCode,
            }, {
                where: {
                    transactionId: transaction.id,
                    productCode: productCode,
                },
                transaction: t,
            });
            transaction.totalQuantity += quantityDifference;
            await this.Transaction.update({ totalQuantity: transaction.totalQuantity }, {
                where: { id: transaction.id },
                transaction: t,
            });
            existingProduct.quantity += existingItem.quantity;
            await this.Product.update({ quantity: existingProduct.quantity }, {
                where: { id: existingProduct.id },
                transaction: t,
            });
            if (newProduct) {
                newProduct.quantity -= data.quantity;
                await this.Product.update({ quantity: newProduct.quantity }, {
                    where: { id: newProduct.id },
                    transaction: t,
                });
                await databases_1.default.ProductHistory.create({
                    productId: newProduct.id,
                    deliveryOrderNumber: transaction.deliveryOrderNumber,
                    quantityChange: -data.quantity,
                    reason: 'Updated item in transaction',
                    timestamp: new Date()
                }, { transaction: t });
            }
            await databases_1.default.ProductHistory.create({
                productId: existingProduct.id,
                deliveryOrderNumber: transaction.deliveryOrderNumber,
                quantityChange: quantityDifference,
                reason: 'Updated item in transaction',
                timestamp: new Date()
            }, { transaction: t });
            await t.commit();
            return transaction;
        }
        catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async deleteItem(id, productCode) {
        const t = await databases_1.default.sequelize.transaction();
        try {
            const transaction = await this.getTransactionById(id);
            if (!transaction) {
                throw new HttpException_1.HttpException(404, 'Transaksi tidak ditemukan');
            }
            const itemToDelete = await this.TransactionItem.findOne({
                where: {
                    transactionId: transaction.id,
                    productCode: productCode,
                }
            });
            if (!itemToDelete) {
                throw new HttpException_1.HttpException(404, 'Item tidak ditemukan dalam transaksi');
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
            });
            await this.Transaction.update({ totalQuantity: (sumTransactionItem !== null && sumTransactionItem !== void 0 ? sumTransactionItem : 0) }, {
                where: { id: transaction.id },
                transaction: t,
            });
            const product = await this.Product.findOne({
                where: {
                    code: productCode,
                },
                attributes: ['id', 'quantity']
            });
            if (!product) {
                throw new HttpException_1.HttpException(404, 'Produk tidak ditemukan');
            }
            product.quantity += itemToDelete.quantity;
            await this.Product.update({ quantity: product.quantity }, {
                where: { id: product.id },
                transaction: t,
            });
            await databases_1.default.ProductHistory.create({
                productId: product.id,
                deliveryOrderNumber: transaction.deliveryOrderNumber,
                quantityChange: itemToDelete.quantity,
                reason: 'Deleted item from transaction',
                timestamp: new Date()
            }, { transaction: t });
            await t.commit();
            return transaction;
        }
        catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async getDetailItem(id) {
        try {
            const transactionItem = await this.TransactionItem.findByPk(id, {
                include: [
                    {
                        model: databases_1.default.Product,
                        as: 'product',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: databases_1.default.Type,
                                as: 'type',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: databases_1.default.Unit,
                                as: 'unit',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: databases_1.default.UnitSize,
                                as: 'unit_size',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: databases_1.default.Transaction,
                        as: 'transaction',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ]
            });
            if (!transactionItem) {
                throw new HttpException_1.HttpException(404, 'Item tidak ditemukan');
            }
            return transactionItem;
        }
        catch (error) {
            throw error;
        }
    }
    async getTransactionItems(id, page, dataPerPage, query) {
        try {
            const offset = (page - 1) * dataPerPage;
            const whereConditions = { transactionId: id };
            const condition = {
                include: [
                    {
                        model: databases_1.default.Product,
                        as: 'product',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: databases_1.default.Type,
                                as: 'type',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: databases_1.default.Unit,
                                as: 'unit',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: databases_1.default.UnitSize,
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
                whereConditions[databases_1.default.Sequelize.Op.or] = [
                    {
                        name: {
                            [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                        },
                    },
                    {
                        code: {
                            [databases_1.default.Sequelize.Op.iLike]: `%${query.search}%`,
                        },
                    },
                ];
            }
            if (query.code) {
                condition.where = Object.assign(Object.assign({}, condition.where), { '$product.code$': query.code });
            }
            if (query.name) {
                condition.where = Object.assign(Object.assign({}, condition.where), { '$product.name$': query.name });
            }
            if (query.unit_size_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { '$product.unit_size_id$': query.unit_size_id });
            }
            if (query.unit_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { '$product.unit_id$': query.unit_id });
            }
            if (query.type_id) {
                condition.where = Object.assign(Object.assign({}, condition.where), { '$product.type_id$': query.type_id });
            }
            const { count, rows } = await this.TransactionItem.findAndCountAll(condition);
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
exports.default = TransactionService;
//# sourceMappingURL=transaction.service.js.map