"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resMsg_dto_1 = require("../dtos/resMsg.dto");
const dropdown_service_1 = tslib_1.__importDefault(require("../services/dropdown.service"));
class DropdownController {
    constructor() {
        this.DropdownService = new dropdown_service_1.default();
        this.getUnitDropdownList = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.DropdownService.unitDropdownList(req.query.page, req.query.dataPerPage, req.query.search, req.query.unit_size_id);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUnitSizeDropdownList = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.DropdownService.unitSizeDropdownList(req.query.page, req.query.dataPerPage, req.query.search, req.query.unit_id);
                resMsg.code = 1;
                resMsg.data = data;
                resMsg.message = ['Success'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.getTypeDropdownList = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const data = await this.DropdownService.typeDropdownList(req.query.page, req.query.dataPerPage, req.query.search);
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
exports.default = DropdownController;
//# sourceMappingURL=dropdown.controller.js.map