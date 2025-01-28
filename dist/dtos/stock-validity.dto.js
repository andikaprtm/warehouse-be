"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCheckDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
class StockCheckItemDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product code is required' }),
    (0, class_validator_1.IsString)({ message: 'Product code must be a string' }),
    tslib_1.__metadata("design:type", String)
], StockCheckItemDto.prototype, "productCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity is required' }),
    (0, class_validator_1.IsInt)({ message: 'Quantity must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    tslib_1.__metadata("design:type", Number)
], StockCheckItemDto.prototype, "quantity", void 0);
class StockCheckDto {
}
exports.StockCheckDto = StockCheckDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)({ message: 'Items must be an array' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockCheckItemDto),
    tslib_1.__metadata("design:type", Array)
], StockCheckDto.prototype, "items", void 0);
//# sourceMappingURL=stock-validity.dto.js.map