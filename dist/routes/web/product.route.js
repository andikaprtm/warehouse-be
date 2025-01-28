"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = tslib_1.__importDefault(require("../../middlewares/role.middleware"));
const enum_utils_1 = require("../../utils/enum.utils");
const product_controller_1 = tslib_1.__importDefault(require("../../controllers/product.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const product_dto_1 = require("../../dtos/product.dto");
class ProductRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/product', auth_middleware_1.default, this.router);
        /**
         * @openapi
         * /product/list:
         *   get:
         *     tags:
         *       - Product
         *     summary: Get list of products
         *     description: Retrieves a list of products with pagination.
         *     parameters:
         *       - in: query
         *         name: page
         *         required: true
         *         schema:
         *           type: integer
         *       - in: query
         *         name: dataPerPage
         *         required: true
         *         schema:
         *           type: integer
         *       - in: query
         *         name: search
         *         required: false
         *         schema:
         *           type: string
         *       - in: query
         *         name: code
         *         required: false
         *         schema:
         *           type: string
         *       - in: query
         *         name: name
         *         required: false
         *         schema:
         *           type: string
         *       - in: query
         *         name: unit_size_id
         *         required: false
         *         schema:
         *           type: integer
         *       - in: query
         *         name: unit_id
         *         required: false
         *         schema:
         *           type: integer
         *       - in: query
         *         name: type_id
         *         required: false
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Successfully retrieved product list
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *                 data:
         *                   type: object
         *                   additionalProperties: true
         *       400:
         *         description: Bad request
         *       404:
         *         description: Not found
         */
        this.router.get('/list', this.productController.getListProduct);
        /**
         * @openapi
         * /product/detail/{id}:
         *   get:
         *     tags:
         *       - Product
         *     summary: Get product details
         *     description: Retrieves detailed information about a specific product.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Successfully retrieved product details
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *                 data:
         *                   type: object
         *                   additionalProperties: true
         *       400:
         *         description: Bad request
         *       404:
         *         description: Not found
         */
        this.router.get('/detail/:id', this.productController.getDetailProduct);
        /**
         * @openapi
         * /product/update/{id}:
         *   put:
         *     tags:
         *       - Product
         *     summary: Update product
         *     description: Updates information of a specified product.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateProductSchemas'
         *     responses:
         *       200:
         *         description: Successfully updated product
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *       400:
         *         description: Bad request
         *       404:
         *         description: Not found
         */
        this.router.put('/update/:id', (0, role_middleware_1.default)({
            roles: [enum_utils_1.Role.WAREHOUSE_ADMIN],
        }), (0, validation_middleware_1.default)(product_dto_1.UpdateProductDto, 'body'), this.productController.updateProduct);
        /**
         * @openapi
         * /product/delete/{id}:
         *   delete:
         *     tags:
         *       - Product
         *     summary: Delete product
         *     description: Deletes a specified product.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Successfully deleted product
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *       400:
         *         description: Bad request
         *       404:
         *         description: Not found
         */
        this.router.delete('/delete/:id', (0, role_middleware_1.default)({
            roles: [enum_utils_1.Role.WAREHOUSE_ADMIN],
        }), this.productController.deleteProduct);
        /**
         * @openapi
         * /product/create:
         *   post:
         *     tags:
         *       - Product
         *     summary: Create product
         *     description: Creates a new product.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateProductSchemas'
         *     responses:
         *       200:
         *         description: Successfully created product
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *       400:
         *         description: Bad request
         */
        this.router.post('/create', (0, role_middleware_1.default)({
            roles: [enum_utils_1.Role.WAREHOUSE_ADMIN],
        }), (0, validation_middleware_1.default)(product_dto_1.CreateProductDto, 'body'), this.productController.createProduct);
        /**
         * @openapi
         * /product/history/list:
         *   get:
         *     tags:
         *       - Product History
         *     summary: Get list of product history
         *     description: Retrieves a list of product history records with pagination.
         *     parameters:
         *       - in: query
         *         name: page
         *         required: true
         *         schema:
         *           type: integer
         *       - in: query
         *         name: dataPerPage
         *         required: true
         *         schema:
         *           type: integer
         *       - in: query
         *         name: productId
         *         required: false
         *         schema:
         *           type: integer
         *       - in: query
         *         name: deliveryOrderNumber
         *         required: false
         *         schema:
         *           type: string
         *       - in: query
         *         name: reason
         *         required: false
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Successfully retrieved product history list
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 code:
         *                   type: integer
         *                 message:
         *                   type: array
         *                   items:
         *                     type: string
         *                 data:
         *                   type: object
         *                   additionalProperties: true
         *       400:
         *         description: Bad request
         *       404:
         *         description: Not found
         */
        this.router.get('/history/list', this.productController.getListProductHistory);
    }
}
exports.default = ProductRoute;
//# sourceMappingURL=product.route.js.map