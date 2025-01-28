'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitSizeModel = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class UnitSizeModel extends sequelize_1.Model {
}
exports.UnitSizeModel = UnitSizeModel;
function default_1(sequelize) {
    UnitSizeModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
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
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'unit_size',
        modelName: 'UnitSize',
    });
    return UnitSizeModel;
}
//# sourceMappingURL=unit_size.model.js.map