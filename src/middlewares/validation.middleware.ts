import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '@/exceptions/HttpException';

const validationMiddleware = (
	type: any,
	value: string | 'body' | 'query' | 'params' = 'body',
	skipMissingProperties = false,
	whitelist = true,
	forbidNonWhitelisted = true
): RequestHandler => {
	return async (req, res, next) => {
		try {
			const instance = plainToInstance(type, req[value]);
			const errors = await validate(instance, {
				skipMissingProperties,
				whitelist,
				forbidNonWhitelisted,
			});

			// Log the validation errors
			// console.log('Validation Errors:', JSON.stringify(errors, null, 2));

			if (errors.length > 0) {
				const message: { [key: string]: string[] } = {};
				errors.forEach((error: ValidationError) => {
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
							} else {
								// Capture the error for the current child
								message[propertyPath] = Object.values(childError.constraints || []);
							}
						});
					} else {
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

				next(new HttpException(400, message));
			} else {
				next();
			}
		} catch (error) {
			next(new HttpException(500, 'Internal Server Error'));
		}
	};
};

export default validationMiddleware;
