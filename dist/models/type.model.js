'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class TypeModel extends sequelize_1.Model {
}
exports.TypeModel = TypeModel;
function default_1(sequelize) {
    TypeModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'type',
        modelName: 'Type',
    });
    return TypeModel;
}
//# sourceMappingURL=type.model.js.map