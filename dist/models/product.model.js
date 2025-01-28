'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class ProductModel extends sequelize_1.Model {
}
exports.ProductModel = ProductModel;
function default_1(sequelize) {
    ProductModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: sequelize_1.DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
        typeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'type_id',
            references: {
                model: 'type',
                key: 'id',
            },
        },
        unitId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'unit_id',
            references: {
                model: 'unit',
                key: 'id',
            },
        },
        unitSizeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'unit_size_id',
            references: {
                model: 'unit_size',
                key: 'id',
            },
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
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
        tableName: 'product',
        modelName: 'Product',
        paranoid: true, // Enables soft deletes
    });
    return ProductModel;
}
//# sourceMappingURL=product.model.js.map