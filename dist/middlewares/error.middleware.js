"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resMsg_dto_1 = require("../dtos/resMsg.dto");
const logger_1 = require("../configs/logger");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.code || 500;
        let message = error.message || ['Terjadi kesalahan pada server'];
        let resMsg = new resMsg_dto_1.CreateResMsg();
        resMsg.code = status == 500 ? -1 : 0;
        if (!Array.isArray(message))
            message = [message];
        resMsg.message = message;
        if (status === 500 && process.env.NODE_ENV === 'production') {
            resMsg.message = ['Terjadi gangguan pada Server'];
        }
        else {
            if (error.stack !== null)
                resMsg.stack = error.stack;
        }
        logger_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json(resMsg);
    }
    catch (error) {
        logger_1.logger.error(`[${req.method}] ${req.path} >> Error:: ${error}`);
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map