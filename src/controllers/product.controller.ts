import { Request, Response, NextFunction } from 'express';

import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import ProductService from '@/services/product.service';

class ProductController {
	public ProductService = new ProductService();

	public getListProduct = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.ProductService.getListProduct(
				req.query.page,
				req.query.dataPerPage,
				req.query
			);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getDetailProduct = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.ProductService.getProductById(req.params.id);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public updateProduct = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = req.body;
			const id = req.params.id;

			await this.ProductService.updateProduct(id, data);

			resMsg.code = 1;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public deleteProduct = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();

			await this.ProductService.deleteProduct(req.params.id);

			resMsg.code = 1;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public createProduct = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = req.body;

			await this.ProductService.createProduct(data);

			resMsg.code = 1;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getListProductHistory = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = await this.ProductService.getListProductHistory(
				req.query.page,
				req.query.dataPerPage,
				req.query
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

export default ProductController;
