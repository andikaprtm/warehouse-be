import { Request, Response, NextFunction } from 'express';
import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import DashboardService from '@/services/dashboard.service';

class DashboardController {
	public dashboardService = new DashboardService();

	public getBatchData = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const year = req.query.year;

			const data = await this.dashboardService.getDashboardData(
				year
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

export default DashboardController;
