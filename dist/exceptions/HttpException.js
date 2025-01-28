"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException {
    constructor(status, message, data, stack) {
        this.code = status || null;
        this.data = data || null;
        this.message = message || null;
        if (process.env.NODE_ENV === 'development') {
            this.stack = stack || null;
        }
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map