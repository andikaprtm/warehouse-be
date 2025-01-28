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
export declare class CreateTransactionDto {
    deliveryOrderNumber: string;
    organizerName: string;
    approvalName: string;
    senderName: string;
    recipientName: string;
}
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
export declare class UpdateTransactionDto {
    deliveryOrderNumber?: string;
    organizerName?: string;
    approvalName?: string;
    senderName?: string;
    recipientName?: string;
}
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
export declare class CreateTransactionItemDto {
    productCode: string;
    quantity: number;
}
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
export declare class UpdateTransactionItemDto {
    quantity: number;
    productCode?: string;
}
