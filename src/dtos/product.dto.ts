import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsInt,
	Min,
} from 'class-validator';

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
export class CreateProductDto {
	@IsNotEmpty({ message: 'code is Required' })
	@IsString({ message: 'code must be a string' })
	public code: string;

	@IsNotEmpty({ message: 'name is Required' })
	@IsString({ message: 'name must be a string' })
	public name: string;

	@IsOptional()
	@IsInt({ message: 'unitSizeId must be an integer' })
	public unitSizeId?: number;

	@IsOptional()
	@IsInt({ message: 'unitId must be an integer' })
	public unitId?: number;

	@IsOptional()
	@IsInt({ message: 'typeId must be an integer' })
	public typeId?: number;

	@IsOptional()
	@IsInt({ message: 'quantity must be an integer' })
	@Min(0, { message: 'quantity must not be negative' })
	public quantity?: number;
}

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
export class UpdateProductDto {
	@IsOptional()
	@IsString({ message: 'code must be a string' })
	public code?: string;

	@IsOptional()
	@IsString({ message: 'name must be a string' })
	public name?: string;

	@IsOptional()
	@IsInt({ message: 'unitSizeId must be an integer' })
	public unitSizeId?: number;

	@IsOptional()
	@IsInt({ message: 'unitId must be an integer' })
	public unitId?: number;

	@IsOptional()
	@IsInt({ message: 'typeId must be an integer' })
	public typeId?: number;

	@IsOptional()
	@IsInt({ message: 'quantity must be an integer' })
	@Min(0, { message: 'quantity must not be negative' })
	public quantity?: number;
}
