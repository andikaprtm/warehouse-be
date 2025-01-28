"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../../controllers/auth.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const user_dto_1 = require("../../dtos/user.dto");
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.AuthController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @openapi
         * '/auth/login':
         *   post:
         *     tags:
         *     - Auth
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/LoginUserSchemas'
         *     responses:
         *       200:
         *         description: Success.
         */
        this.router.post(`/login`, (0, validation_middleware_1.default)(user_dto_1.LoginUserDto, 'body'), this.AuthController.loginWeb);
        this.router.use('/auth', this.router);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map