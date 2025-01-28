"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stock_validation_service_1 = tslib_1.__importDefault(require("../services/stock-validation.service"));
class StockValidityController {
    constructor() {
        this.transactionService = new stock_validation_service_1.default();
        this.stockCheck = async (req, res, next) => {
            try {
                const stockData = req.body.items;
                const results = await this.transactionService.stockCheck(stockData);
                return res.status(200).json({
                    code: 1,
                    message: ['Stock checked successfully'],
                    data: results,
                });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
    }
}
exports.default = StockValidityController;
//# sourceMappingURL=stock-validity.controller.js.map