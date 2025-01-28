"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = require("../exceptions/HttpException");
const validationMiddleware = (type, value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
    return async (req, res, next) => {
        try {
            const instance = (0, class_transformer_1.plainToInstance)(type, req[value]);
            const errors = await (0, class_validator_1.validate)(instance, {
                skipMissingProperties,
                whitelist,
                forbidNonWhitelisted,
            });
            // Log the validation errors
            // console.log('Validation Errors:', JSON.stringify(errors, null, 2));
            if (errors.length > 0) {
                const message = {};
                errors.forEach((error) => {
                    if (error.children && error.children.length > 0) {
                        // Handle nested validation errors
                        error.children.forEach((childError) => {
                            const propertyPath = `${error.property}.${childError.property}`;
                            if (childError.children && childError.children.length > 0) {
                                // If there are further nested errors, process them
                                childError.children.forEach((nestedError) => {
                                    const nestedPropertyPath = `${propertyPath}.${nestedError.property}`;
                                    message[nestedPropertyPath] = Object.values(nestedError.constraints || []);
                                });
                            }
                            else {
                                // Capture the error for the current child
                                message[propertyPath] = Object.values(childError.constraints || []);
                            }
                        });
                    }
                    else {
                        // Handle top-level validation errors
                        message[error.property] = Object.values(error.constraints || []);
                    }
                });
                // If there are no constraints for a specific property, ensure it returns a meaningful message
                for (const key in message) {
                    if (message[key].length === 0) {
                        message[key].push('Validation failed for this property.');
                    }
                }
                next(new HttpException_1.HttpException(400, message));
            }
            else {
                next();
            }
        }
        catch (error) {
            next(new HttpException_1.HttpException(500, 'Internal Server Error'));
        }
    };
};
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map