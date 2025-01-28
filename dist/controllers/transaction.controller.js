"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resMsg_dto_1 = require("../dtos/resMsg.dto");
const transaction_service_1 = tslib_1.__importDefault(require("../services/transaction.service"));
class TransactionController {
    constructor() {
        this.transactionService = new transaction_service_1.default();
        this.getListTransaction = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const page = Number(req.query.page) || 1;
                const dataPerPage = Number(req.query.dataPerPage) || 10;
                const data = await this.transactionService.getListTransaction(page, dataPerPage, req.query);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getTransactionDetail = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const data = await this.transactionService.getTransactionById(id);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.createTransaction = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = req.body;
                const transaction = await this.transactionService.createTransaction(data);
                resMsg.code = 1;
                resMsg.data = transaction;
                resMsg.message = ['Transaction created successfully'];
                res.status(201).json(resMsg); // 201 Created status
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTransaction = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const data = req.body;
                await this.transactionService.updateTransaction(id, data);
                resMsg.code = 1;
                resMsg.message = ['Transaction updated successfully'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTransaction = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                await this.transactionService.deleteTransaction(id);
                resMsg.code = 1;
                resMsg.message = ['Transaction deleted successfully'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.addItem = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const data = req.body;
                const transaction = await this.transactionService.addItem(id, data);
                resMsg.code = 1;
                resMsg.data = transaction;
                resMsg.message = ['Item added successfully'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateItem = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const productCode = req.params.productCode;
                const data = req.body;
                const transaction = await this.transactionService.updateItem(id, productCode, data);
                resMsg.code = 1;
                resMsg.data = transaction;
                resMsg.message = ['Item Updated successfully'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteItem = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const productCode = req.params.productCode;
                await this.transactionService.deleteItem(id, productCode);
                resMsg.code = 1;
                resMsg.message = ['Item deleted successfully'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDetailItem = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = req.params.itemId;
                const transactionItem = await this.transactionService.getDetailItem(id);
                resMsg.code = 1;
                resMsg.data = transactionItem;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getTransactionItems = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const id = Number(req.params.id);
                const page = Number(req.query.page) || 1;
                const dataPerPage = Number(req.query.dataPerPage) || 10;
                const data = await this.transactionService.getTransactionItems(id, page, dataPerPage, req.query);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transaction.controller.js.map