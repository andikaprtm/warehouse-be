"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = tslib_1.__importDefault(require("sequelize"));
const logger_1 = require("../configs/logger");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const transaction_model_1 = tslib_1.__importDefault(require("../models/transaction.model"));
const transaction_item_model_1 = tslib_1.__importDefault(require("../models/transaction_item.model"));
const product_model_1 = tslib_1.__importDefault(require("../models/product.model"));
const type_model_1 = tslib_1.__importDefault(require("../models/type.model"));
const unit_model_1 = tslib_1.__importDefault(require("../models/unit.model"));
const unit_size_model_1 = tslib_1.__importDefault(require("../models/unit_size.model"));
const product_history_model_1 = tslib_1.__importDefault(require("../models/product-history.model"));
const config_1 = require("../configs/config");
const pg_1 = tslib_1.__importDefault(require("pg"));
const { database, username, password, host, port, dialect } = config_1.config;
const poolMax = config_1.config.pool.max;
const poolMin = config_1.config.pool.min;
const sequelize = new sequelize_1.default.Sequelize(database, username, password, {
    host: host,
    dialect: dialect || 'mysql',
    port: Number(port),
    dialectModule: pg_1.default,
    timezone: '+07:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: false,
        timestamps: true,
        paranoid: false,
    },
    pool: {
        min: poolMin,
        max: poolMax,
    },
    logQueryParameters: process.env.NODE_ENV === 'development',
    logging: (query, time) => {
        logger_1.logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
});
sequelize.authenticate();
sequelize.sync({ force: false }); // Beware of using { force: true } in production
const DB = {
    User: (0, user_model_1.default)(sequelize),
    Product: (0, product_model_1.default)(sequelize),
    Transaction: (0, transaction_model_1.default)(sequelize),
    TransactionItem: (0, transaction_item_model_1.default)(sequelize),
    ProductHistory: (0, product_history_model_1.default)(sequelize),
    Type: (0, type_model_1.default)(sequelize),
    Unit: (0, unit_model_1.default)(sequelize),
    UnitSize: (0, unit_size_model_1.default)(sequelize),
    sequelize,
    Sequelize: sequelize_1.default,
};
DB.ProductHistory.belongsTo(DB.Product, {
    foreignKey: 'product_id',
    as: 'product'
});
DB.Product.belongsTo(DB.Type, {
    foreignKey: 'type_id',
    as: 'type',
});
DB.Product.belongsTo(DB.Unit, {
    foreignKey: 'unit_id',
    as: 'unit',
});
DB.Product.belongsTo(DB.UnitSize, {
    foreignKey: 'unit_size_id',
    as: 'unit_size',
});
DB.TransactionItem.belongsTo(DB.Product, {
    foreignKey: 'product_code',
    targetKey: 'code',
    as: 'product',
});
DB.TransactionItem.belongsTo(DB.Transaction, {
    foreignKey: 'transaction_id',
    as: 'transaction',
});
exports.default = DB;
//# sourceMappingURL=index.js.map