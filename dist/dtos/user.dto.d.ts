/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserSchemas:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - phone
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          default: Takkun User
 *        email:
 *          type: string
 *          default: takkun@gmail.com
 *        phone:
 *          type: string
 *          default: 089808202
 *        password:
 *          type: string
 *          default: password
 */
export declare class RegisterUserDto {
    name: string;
    email: string;
    phone: string;
    password: string;
}
/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserSchemas:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: admin_gudang
 *        password:
 *          type: string
 *          default: 123456
 */
export declare class LoginUserDto {
    username: string;
    password: string;
}
