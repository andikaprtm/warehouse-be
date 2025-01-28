'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class TransactionModel extends sequelize_1.Model {
}
exports.TransactionModel = TransactionModel;
function default_1(sequelize) {
    TransactionModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        deliveryOrderNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        organizerName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        approvalName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        senderName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        recipientName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        totalQuantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            field: 'created_at',
            allowNull: true,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            field: 'updated_at',
            allowNull: true,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE,
            field: 'deleted_at',
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'transaction',
        modelName: 'Transaction',
        paranoid: true,
    });
    return TransactionModel;
}
//# sourceMappingURL=transaction.model.js.map