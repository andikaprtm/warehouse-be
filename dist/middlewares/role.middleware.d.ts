import { NextFunction, Response } from 'express';
import { Role } from '../utils/enum.utils';
interface RoleMiddlewareOptions {
    roles: Role[];
}
declare const RoleMiddleware: (options: RoleMiddlewareOptions) => (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default RoleMiddleware;
