"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
require("dotenv/config");
const app_1 = tslib_1.__importDefault(require("./app"));
const auth_route_1 = tslib_1.__importDefault(require("./routes/web/auth.route"));
const product_route_1 = tslib_1.__importDefault(require("./routes/web/product.route"));
const dropdown_route_1 = tslib_1.__importDefault(require("./routes/dropdown.route"));
const transaction_route_1 = tslib_1.__importDefault(require("./routes/web/transaction.route"));
const stock_validity_route_1 = tslib_1.__importDefault(require("./routes/web/stock-validity.route"));
const dashboard_route_1 = tslib_1.__importDefault(require("./routes/web/dashboard.route"));
const app = new app_1.default([
    {
        AppType: 'Mobile',
        Routes: [],
    },
    {
        AppType: 'Web',
        Routes: [
            new auth_route_1.default(),
            new product_route_1.default(),
            new dropdown_route_1.default(),
            new transaction_route_1.default(),
            new stock_validity_route_1.default(),
            new dashboard_route_1.default(),
        ],
    },
]);
app.listen();
//# sourceMappingURL=server.js.map