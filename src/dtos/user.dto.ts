import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Matches,
} from 'class-validator';

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
export class RegisterUserDto {
	@IsNotEmpty({ message: 'name is Required' })
	@IsString({ message: 'name must be a text' })
	public name: string;

	@IsNotEmpty({ message: 'email is Required' })
	@IsString({ message: 'email must be a text' })
	@IsEmail(undefined, { message: 'email must be a valid email' })
	public email: string;

	@IsNotEmpty({ message: 'phone is Required' })
	@IsString({ message: 'phone must be a string' })
	@Length(7, 15, { message: 'phone must be between 7 and 15 characters' })
	@Matches(/^[0-9]+$/, { message: 'phone must contain only numeric characters' })
	public phone: string;

	@IsNotEmpty({ message: 'password is Required' })
	@IsString({ message: 'password must be a text' })
	public password: string;
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
export class LoginUserDto {
	@IsNotEmpty({ message: 'username is Required' })
	@IsString({ message: 'username must be a text' })
	public username: string;

	@IsNotEmpty({ message: 'password is Required' })
	@IsString({ message: 'password must be a text' })
	public password: string;
}
