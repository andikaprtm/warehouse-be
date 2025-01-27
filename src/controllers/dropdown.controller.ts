import { Request, Response, NextFunction } from 'express';

import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import DropdownService from '@/services/dropdown.service';

class DropdownController {
	public DropdownService = new DropdownService();

	public getUnitDropdownList = async (
		req: any,
		res: Response,
		next: NextFunction
	) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.DropdownService.unitDropdownList(
				req.query.page,
				req.query.dataPerPage,
				req.query.search,
				req.query.unit_size_id
			);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getUnitSizeDropdownList = async (
		req: any,
		res: Response,
		next: NextFunction
	) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.DropdownService.unitSizeDropdownList(
				req.query.page,
				req.query.dataPerPage,
				req.query.search,
				req.query.unit_id
			);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getTypeDropdownList = async (
		req: any,
		res: Response,
		next: NextFunction
	) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.DropdownService.typeDropdownList(
				req.query.page,
				req.query.dataPerPage,
				req.query.search,
			);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};


}

export default DropdownController;
