import Sequelize from 'sequelize';
import { logger } from '@/configs/logger';
import UserModel from '@/models/user.model';
import TransactionModel from '@/models/transaction.model';
import TransactionItemModel from '@/models/transaction_item.model';
import ProductModel from '@/models/product.model';
import TypeModel from '@/models/type.model';
import UnitModel from '@/models/unit.model';
import UnitSizeModel from '@/models/unit_size.model';
import ProductHistoryModel from '@/models/product-history.model';
import { config } from '@/configs/config';

const { database, username, password, host, port, dialect } = config;
const poolMax = config.pool.max;
const poolMin = config.pool.min;

const sequelize = new Sequelize.Sequelize(database, username, password, {
	host: host,
	dialect: dialect || 'mysql',
	port: Number(port),
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
		logger.info(time + 'ms' + ' ' + query);
	},
	benchmark: true,
});

sequelize.authenticate();
sequelize.sync({ force: false }); // Beware of using { force: true } in production

const DB = {
	User: UserModel(sequelize),
	Product: ProductModel(sequelize),
	Transaction: TransactionModel(sequelize),
	TransactionItem: TransactionItemModel(sequelize),
	ProductHistory: ProductHistoryModel(sequelize),
	Type: TypeModel(sequelize),
	Unit: UnitModel(sequelize),
	UnitSize: UnitSizeModel(sequelize),
	sequelize,
	Sequelize,
};

DB.ProductHistory.belongsTo(DB.Product,{
	foreignKey: 'product_id',
	as: 'product'
})

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



export default DB;
