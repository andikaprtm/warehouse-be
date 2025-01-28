import { NextFunction, Response } from 'express';
declare const authMiddleware: (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default authMiddleware;
