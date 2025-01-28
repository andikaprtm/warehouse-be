'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
function default_1(sequelize) {
    UserModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
        username: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.SMALLINT,
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
        tableName: 'user',
        modelName: 'User',
        paranoid: true,
    });
    return UserModel;
}
//# sourceMappingURL=user.model.js.map