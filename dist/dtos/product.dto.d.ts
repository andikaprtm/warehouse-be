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
export declare class CreateProductDto {
    code: string;
    name: string;
    unitSizeId?: number;
    unitId?: number;
    typeId?: number;
    quantity?: number;
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
export declare class UpdateProductDto {
    code?: string;
    name?: string;
    unitSizeId?: number;
    unitId?: number;
    typeId?: number;
    quantity?: number;
}
