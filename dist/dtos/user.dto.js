"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = exports.RegisterUserDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
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
class RegisterUserDto {
}
exports.RegisterUserDto = RegisterUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is Required' }),
    (0, class_validator_1.IsString)({ message: 'name must be a text' }),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email is Required' }),
    (0, class_validator_1.IsString)({ message: 'email must be a text' }),
    (0, class_validator_1.IsEmail)(undefined, { message: 'email must be a valid email' }),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'phone is Required' }),
    (0, class_validator_1.IsString)({ message: 'phone must be a string' }),
    (0, class_validator_1.Length)(7, 15, { message: 'phone must be between 7 and 15 characters' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'phone must contain only numeric characters' }),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is Required' }),
    (0, class_validator_1.IsString)({ message: 'password must be a text' }),
    tslib_1.__metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
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
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'username is Required' }),
    (0, class_validator_1.IsString)({ message: 'username must be a text' }),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is Required' }),
    (0, class_validator_1.IsString)({ message: 'password must be a text' }),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=user.dto.js.map