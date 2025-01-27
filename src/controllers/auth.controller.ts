import { Request, Response, NextFunction } from 'express';

import { HttpException } from '@/exceptions/HttpException';
import UserService from '@/services/user.service';
import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';

class AuthController {
	public UserService = new UserService();

	public loginWeb = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const body: any = req.body;

			const authenticate = await this.UserService.loginWeb(
				body.username,
				body.password
			);

			resMsg.code = 1;
			resMsg.data = authenticate;
			resMsg.message = ['Successfully login'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};
	public logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const body: any = req.body;

			// const authenticate = await this.UserService.loginWeb(
			// 	body.username,
			// 	body.password
			// );

			resMsg.code = 1;
			// resMsg.data = authenticate;
			resMsg.message = ['Successfully login'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};
}

export default AuthController;
