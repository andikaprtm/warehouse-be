"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("../services/user.service"));
const resMsg_dto_1 = require("../dtos/resMsg.dto");
class AuthController {
    constructor() {
        this.UserService = new user_service_1.default();
        this.loginWeb = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const body = req.body;
                const authenticate = await this.UserService.loginWeb(body.username, body.password);
                resMsg.code = 1;
                resMsg.data = authenticate;
                resMsg.message = ['Successfully login'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                let resMsg = new resMsg_dto_1.CreateResMsg();
                const body = req.body;
                // const authenticate = await this.UserService.loginWeb(
                // 	body.username,
                // 	body.password
                // );
                resMsg.code = 1;
                // resMsg.data = authenticate;
                resMsg.message = ['Successfully login'];
                res.status(200).json(resMsg);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map