"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const stock_validity_controller_1 = tslib_1.__importDefault(require("../../controllers/stock-validity.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const stock_validity_dto_1 = require("../../dtos/stock-validity.dto");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = tslib_1.__importDefault(require("../../middlewares/role.middleware"));
const enum_utils_1 = require("../../utils/enum.utils");
class StockValidityRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.transactionController = new stock_validity_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/stock', auth_middleware_1.default, (0, role_middleware_1.default)({
            roles: [enum_utils_1.Role.OFFICE_ADMIN],
        }), this.router);
        /**
         * @openapi
         * /stock/check:
         *   post:
         *     tags:
         *       - Stock Validity
         *     summary: Check stock availability
         *     description: Checks the availability of stock for a list of products.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: array
         *             items:
         *               type: object
         *               properties:
         *                 productCode:
         *                   type: string
         *                   description: The code of the product to check stock for.
         *                   example: "P001"
         *                 quantity:
         *                   type: integer
         *                   description: The quantity of the product requested.
         *                   example: 5
         *               required:
         *                 - productCode
         *                 - quantity
         *     responses:
         *       200:
         *         description: Successfully checked stock
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   productCode:
         *                     type: string
         *                   valid:
         *                     type: boolean
         *                   remainingStock:
         *                     type: integer
         *       400:
         *         description: Bad request
         */
        this.router.post('/check', (0, validation_middleware_1.default)(stock_validity_dto_1.StockCheckDto, 'body'), this.transactionController.stockCheck);
    }
}
exports.default = StockValidityRoute;
//# sourceMappingURL=stock-validity.route.js.map