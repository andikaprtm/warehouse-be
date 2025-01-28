"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = tslib_1.__importDefault(require("../../middlewares/role.middleware"));
const enum_utils_1 = require("../../utils/enum.utils");
const dashboard_controller_1 = tslib_1.__importDefault(require("../../controllers/dashboard.controller"));
class DashboardRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.dashboardController = new dashboard_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/dashboard', auth_middleware_1.default, (0, role_middleware_1.default)({
            roles: [enum_utils_1.Role.WAREHOUSE_ADMIN],
        }), this.router);
        /**
         * @openapi
         * /dashboard/data:
         *   get:
         *     tags:
         *       - Dashboard
         *     summary: Get Dashboard data
         *     description: Retrieves a Dashboard data.
         *     parameters:
         *       - in: query
         *         name: year
         *         required: false
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Successfully retrieved dashboard data
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
        this.router.get('/data', this.dashboardController.getBatchData);
    }
}
exports.default = DashboardRoute;
//# sourceMappingURL=dashboard.route.js.map