"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResMsg = void 0;
class CreateResMsg {
    constructor() {
        this.code = null;
        this.data = null;
        this.message = [];
        if (process.env.NODE_ENV === 'development') {
            this.stack = null;
        }
    }
}
exports.CreateResMsg = CreateResMsg;
//# sourceMappingURL=resMsg.dto.js.map