import { Request, Response, NextFunction } from 'express';
import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import TransactionService from '@/services/transaction.service';

class TransactionController {
	public transactionService = new TransactionService();

	public getListTransaction = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const page = Number(req.query.page) || 1; 
			const dataPerPage = Number(req.query.dataPerPage) || 10; 

			const data = await this.transactionService.getListTransaction(
				page,
				dataPerPage,
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

	public getTransactionDetail = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 

			const data = await this.transactionService.getTransactionById(id);

			resMsg.code = 1;
			resMsg.data = data;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const data = req.body;

			const transaction = await this.transactionService.createTransaction(data);

			resMsg.code = 1;
			resMsg.data = transaction;
			resMsg.message = ['Transaction created successfully'];
			res.status(201).json(resMsg); // 201 Created status
		} catch (error) {
			next(error);
		}
	};

	public updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 
			const data = req.body;

			await this.transactionService.updateTransaction(id, data);

			resMsg.code = 1;
			resMsg.message = ['Transaction updated successfully'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 

			await this.transactionService.deleteTransaction(id);

			resMsg.code = 1;
			resMsg.message = ['Transaction deleted successfully'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public addItem = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 
			const data = req.body;

			const transaction = await this.transactionService.addItem(id, data);

			resMsg.code = 1;
			resMsg.data = transaction;
			resMsg.message = ['Item added successfully'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public updateItem = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 
			const productCode = req.params.productCode; 
			const data = req.body;

			const transaction = await this.transactionService.updateItem(id, productCode,data);

			resMsg.code = 1;
			resMsg.data = transaction;
			resMsg.message = ['Item Updated successfully'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};


	public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 
			const productCode = req.params.productCode;

			await this.transactionService.deleteItem(id, productCode);

			resMsg.code = 1;
			resMsg.message = ['Item deleted successfully'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getDetailItem = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = req.params.itemId; 

			const transactionItem = await this.transactionService.getDetailItem(id);

			resMsg.code = 1;
			resMsg.data = transactionItem;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public getTransactionItems = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const id = Number(req.params.id); 
			const page = Number(req.query.page) || 1; 
			const dataPerPage = Number(req.query.dataPerPage) || 10; 

			const data = await this.transactionService.getTransactionItems(
				id,
				page,
				dataPerPage,
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

export default TransactionController;
