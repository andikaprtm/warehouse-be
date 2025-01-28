"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resMsg_dto_1 = require("../dtos/resMsg.dto");
const dashboard_service_1 = tslib_1.__importDefault(require("../services/dashboard.service"));
class DashboardController {
    constructor() {
        this.dashboardService = new dashboard_service_1.default();
        this.getBatchData = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const year = req.query.year;
                const data = await this.dashboardService.getDashboardData(year);
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
exports.default = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map