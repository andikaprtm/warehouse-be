"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const dropdown_controller_1 = tslib_1.__importDefault(require("../controllers/dropdown.controller"));
class DropdownRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.DropdownController = new dropdown_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/dropdown', auth_middleware_1.default, this.router);
        /**
         * @openapi
         * '/dropdown/unit/list':
         *   get:
         *     tags:
         *       - Dropdown
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
         *         name: unit_size_id
         *         required: false
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: List of dropdown retrieved successfully.
         */
        this.router.get('/unit/list', this.DropdownController.getUnitDropdownList);
        /**
         * @openapi
         * '/dropdown/unit-size/list':
         *   get:
         *     tags:
         *       - Dropdown
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
         *         name: unit_id
         *         required: false
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: List of dropdown retrieved successfully.
         */
        this.router.get('/unit-size/list', this.DropdownController.getUnitSizeDropdownList);
        /**
         * @openapi
         * '/dropdown/type/list':
         *   get:
         *     tags:
         *       - Dropdown
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
         *     responses:
         *       200:
         *         description: List of dropdown retrieved successfully.
         */
        this.router.get('/type/list', this.DropdownController.getTypeDropdownList);
    }
}
exports.default = DropdownRoute;
//# sourceMappingURL=dropdown.route.js.map