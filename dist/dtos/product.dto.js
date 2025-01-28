"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = exports.CreateProductDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateProductSchemas:
 *      type: object
 *      required:
 *        - code
 *        - name
 *      properties:
 *        code:
 *          type: string
 *          default: P123
 *        name:
 *          type: string
 *          default: Example Product
 *        unitSizeId:
 *          type: integer
 *          default: 1
 *        unitId:
 *          type: integer
 *          default: 1
 *        typeId:
 *          type: integer
 *          default: 1
 *        quantity:
 *          type: integer
 *          default: 10
 */
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'code is Required' }),
    (0, class_validator_1.IsString)({ message: 'code must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is Required' }),
    (0, class_validator_1.IsString)({ message: 'name must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'unitSizeId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "unitSizeId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'unitId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "unitId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'typeId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "typeId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'quantity must not be negative' }),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateProductSchemas:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *          default: P123
 *        name:
 *          type: string
 *          default: Example Product
 *        unitSizeId:
 *          type: integer
 *          default: 1
 *        unitId:
 *          type: integer
 *          default: 1
 *        typeId:
 *          type: integer
 *          default: 1
 *        quantity:
 *          type: integer
 *          default: 10
 */
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'code must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'name must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'unitSizeId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "unitSizeId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'unitId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "unitId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'typeId must be an integer' }),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "typeId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'quantity must not be negative' }),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "quantity", void 0);
//# sourceMappingURL=product.dto.js.map