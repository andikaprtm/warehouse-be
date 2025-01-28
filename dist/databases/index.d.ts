import Sequelize from 'sequelize';
declare const DB: {
    User: typeof import("../models/user.model").UserModel;
    Product: typeof import("../models/product.model").ProductModel;
    Transaction: typeof import("../models/transaction.model").TransactionModel;
    TransactionItem: typeof import("../models/transaction_item.model").TransactionItemModel;
    ProductHistory: typeof import("../models/product-history.model").ProductHistoryModel;
    Type: typeof import("../models/type.model").TypeModel;
    Unit: typeof import("../models/unit.model").UnitModel;
    UnitSize: typeof import("../models/unit_size.model").UnitSizeModel;
    sequelize: Sequelize.Sequelize;
    Sequelize: typeof Sequelize;
};
export default DB;
