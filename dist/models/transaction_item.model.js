'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionItemModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class TransactionItemModel extends sequelize_1.Model {
}
exports.TransactionItemModel = TransactionItemModel;
function default_1(sequelize) {
    TransactionItemModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transactionId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'transaction_id',
            references: {
                model: 'transaction',
                key: 'id',
            },
        },
        productCode: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
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
        tableName: 'transaction_item',
        modelName: 'TransactionItem',
        paranoid: true,
    });
    return TransactionItemModel;
}
//# sourceMappingURL=transaction_item.model.js.map