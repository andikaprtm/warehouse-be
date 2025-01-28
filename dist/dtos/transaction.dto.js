"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionItemDto = exports.CreateTransactionItemDto = exports.UpdateTransactionDto = exports.CreateTransactionDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTransactionSchemas:
 *      type: object
 *      required:
 *        - deliveryOrderNumber
 *        - organizerName
 *        - approvalName
 *        - senderName
 *        - recipientName
 *      properties:
 *        deliveryOrderNumber:
 *          type: string
 *          default: DO-123456
 *        organizerName:
 *          type: string
 *          default: Example Organizer
 *        approvalName:
 *          type: string
 *          default: Example Approver
 *        senderName:
 *          type: string
 *          default: Example Sender
 *        recipientName:
 *          type: string
 *          default: Example Recipient
 */
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'deliveryOrderNumber is Required' }),
    (0, class_validator_1.IsString)({ message: 'deliveryOrderNumber must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionDto.prototype, "deliveryOrderNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'organizerName is Required' }),
    (0, class_validator_1.IsString)({ message: 'organizerName must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionDto.prototype, "organizerName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'approvalName is Required' }),
    (0, class_validator_1.IsString)({ message: 'approvalName must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionDto.prototype, "approvalName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'senderName is Required' }),
    (0, class_validator_1.IsString)({ message: 'senderName must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionDto.prototype, "senderName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'recipientName is Required' }),
    (0, class_validator_1.IsString)({ message: 'recipientName must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionDto.prototype, "recipientName", void 0);
/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateTransactionSchemas:
 *      type: object
 *      properties:
 *        deliveryOrderNumber:
 *          type: string
 *          default: DO-123456
 *        organizerName:
 *          type: string
 *          default: Example Organizer
 *        approvalName:
 *          type: string
 *          default: Example Approver
 *        senderName:
 *          type: string
 *          default: Example Sender
 *        recipientName:
 *          type: string
 *          default: Example Recipient
 */
class UpdateTransactionDto {
}
exports.UpdateTransactionDto = UpdateTransactionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'deliveryOrderNumber must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionDto.prototype, "deliveryOrderNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'organizerName must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionDto.prototype, "organizerName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'approvalName must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionDto.prototype, "approvalName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'senderName must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionDto.prototype, "senderName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'recipientName must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionDto.prototype, "recipientName", void 0);
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTransactionItemSchemas:
 *      type: object
 *      required:
 *        - productCode
 *        - quantity
 *      properties:
 *        productCode:
 *          type: string
 *          default: P123
 *        quantity:
 *          type: integer
 *          default: 1
 */
class CreateTransactionItemDto {
}
exports.CreateTransactionItemDto = CreateTransactionItemDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productCode is Required' }),
    (0, class_validator_1.IsString)({ message: 'productCode must be a string' }),
    tslib_1.__metadata("design:type", String)
], CreateTransactionItemDto.prototype, "productCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'quantity is Required' }),
    (0, class_validator_1.IsInt)({ message: 'quantity must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'quantity must be at least 1' }),
    tslib_1.__metadata("design:type", Number)
], CreateTransactionItemDto.prototype, "quantity", void 0);
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateTransactionItemSchemas:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           description: The new quantity of the product.
 *           example: 10
 *         productCode:
 *           type: string
 *           description: The new product code (optional).
 *           example: "P123"
 *       required:
 *         - quantity
 */
class UpdateTransactionItemDto {
}
exports.UpdateTransactionItemDto = UpdateTransactionItemDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity is required' }),
    (0, class_validator_1.IsInt)({ message: 'Quantity must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    tslib_1.__metadata("design:type", Number)
], UpdateTransactionItemDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Product code must be a string' }),
    tslib_1.__metadata("design:type", String)
], UpdateTransactionItemDto.prototype, "productCode", void 0);
//# sourceMappingURL=transaction.dto.js.map