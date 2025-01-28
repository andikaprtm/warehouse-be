"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resMsg_dto_1 = require("../dtos/resMsg.dto");
const product_service_1 = tslib_1.__importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.ProductService = new product_service_1.default();
        this.getListProduct = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.ProductService.getListProduct(req.query.page, req.query.dataPerPage, req.query);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDetailProduct = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.ProductService.getProductById(req.params.id);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProduct = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = req.body;
                const id = req.params.id;
                await this.ProductService.updateProduct(id, data);
                resMsg.code = 1;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteProduct = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                await this.ProductService.deleteProduct(req.params.id);
                resMsg.code = 1;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.createProduct = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = req.body;
                await this.ProductService.createProduct(data);
                resMsg.code = 1;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getListProductHistory = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.ProductService.getListProductHistory(req.query.page, req.query.dataPerPage, req.query);
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
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map