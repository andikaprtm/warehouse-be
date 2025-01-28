'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class UnitModel extends sequelize_1.Model {
}
exports.UnitModel = UnitModel;
function default_1(sequelize) {
    UnitModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'unit',
        modelName: 'Unit',
    });
    return UnitModel;
}
//# sourceMappingURL=unit.model.js.map