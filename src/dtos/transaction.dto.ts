import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsInt,
	IsDateString,
	Min,
} from 'class-validator';

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
export class CreateTransactionDto {
	@IsNotEmpty({ message: 'deliveryOrderNumber is Required' })
	@IsString({ message: 'deliveryOrderNumber must be a string' })
	public deliveryOrderNumber: string;

	@IsNotEmpty({ message: 'organizerName is Required' })
	@IsString({ message: 'organizerName must be a string' })
	public organizerName: string;

	@IsNotEmpty({ message: 'approvalName is Required' })
	@IsString({ message: 'approvalName must be a string' })
	public approvalName: string;

	@IsNotEmpty({ message: 'senderName is Required' })
	@IsString({ message: 'senderName must be a string' })
	public senderName: string;

	@IsNotEmpty({ message: 'recipientName is Required' })
	@IsString({ message: 'recipientName must be a string' })
	public recipientName: string;

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
export class UpdateTransactionDto {
	@IsOptional()
	@IsString({ message: 'deliveryOrderNumber must be a string' })
	public deliveryOrderNumber?: string;

	@IsOptional()
	@IsString({ message: 'organizerName must be a string' })
	public organizerName?: string;

	@IsOptional()
	@IsString({ message: 'approvalName must be a string' })
	public approvalName?: string;

	@IsOptional()
	@IsString({ message: 'senderName must be a string' })
	public senderName?: string;

	@IsOptional()
	@IsString({ message: 'recipientName must be a string' })
	public recipientName?: string;
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
export class CreateTransactionItemDto {
	@IsNotEmpty({ message: 'productCode is Required' })
	@IsString({ message: 'productCode must be a string' })
	public productCode: string;

	@IsNotEmpty({ message: 'quantity is Required' })
	@IsInt({ message: 'quantity must be an integer' })
	@Min(1, { message: 'quantity must be at least 1' })
	public quantity: number;
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
export class UpdateTransactionItemDto {
    @IsNotEmpty({ message: 'Quantity is required' })
    @IsInt({ message: 'Quantity must be an integer' })
    @Min(1, { message: 'Quantity must be at least 1' })
    public quantity: number;

    @IsOptional()
    @IsString({ message: 'Product code must be a string' })
    public productCode?: string; // Optional field
}