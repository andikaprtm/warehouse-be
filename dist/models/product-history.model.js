'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHistoryModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class ProductHistoryModel extends sequelize_1.Model {
}
exports.ProductHistoryModel = ProductHistoryModel;
function default_1(sequelize) {
    ProductHistoryModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id',
            },
        },
        deliveryOrderNumber: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        quantityChange: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        timestamp: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'product_histories',
        modelName: 'ProductHistory',
        timestamps: false,
    });
    return ProductHistoryModel;
}
//# sourceMappingURL=product-history.model.js.map