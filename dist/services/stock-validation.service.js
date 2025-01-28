"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
class StockValidationService {
    constructor() {
        this.Product = databases_1.default.Product;
    }
    async stockCheck(data) {
        try {
            const results = await Promise.all(data.map(async (item) => {
                const product = await this.Product.findOne({
                    where: { code: item.productCode },
                    attributes: ['id', 'quantity'],
                });
                if (!product) {
                    return {
                        productCode: item.productCode,
                        valid: false,
                        remainingStock: 0,
                    };
                }
                const isValid = item.quantity <= product.quantity;
                return {
                    productCode: item.productCode,
                    valid: isValid,
                    remainingStock: isValid ? product.quantity : product.quantity - item.quantity,
                };
            }));
            return results;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = StockValidationService;
//# sourceMappingURL=stock-validation.service.js.map