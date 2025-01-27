import { NextFunction, Request, Response } from 'express';
import { Role } from '@/utils/enum.utils';

interface RoleMiddlewareOptions {
	roles: Role[];
}

const RoleMiddleware = (options: RoleMiddlewareOptions) => {
	return (req: any, res: Response, next: NextFunction) => {
		try {
			const user = req.user;
			if (!options.roles.includes(user.role)) {
				return res.status(403).send({ code: 0, message: 'Forbidden', data: null });
			}

			next();
		} catch (error) {
			return res.status(error.statusCode || 500).send({ message: error.message });
		}
	};
};

export default RoleMiddleware;
