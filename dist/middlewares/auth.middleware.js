"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const User = databases_1.default.User;
        let decodedToken = null;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        const ERR = {
            401: {
                statusCode: 401,
                send: { code: 0, message: 'Unauthorized', data: null },
            },
            403: {
                statusCode: 403,
                send: { code: 0, message: 'Forbidden', data: null },
            },
        };
        let secretKey = process.env.JWT_SECRET_KEY_WEB;
        if (!accessToken)
            throw ERR[401];
        else
            decodedToken = jsonwebtoken_1.default.decode(accessToken);
        if (decodedToken != null && decodedToken.sub === process.env.JWT_SUB) {
            jsonwebtoken_1.default.verify(accessToken, secretKey, (error, result) => {
                process.nextTick(async () => {
                    try {
                        if (error)
                            return res.status(ERR[403].statusCode).send(ERR[403].send);
                        const findUser = await User.findOne({
                            where: {
                                id: decodedToken.data.id,
                                deletedAt: null,
                            },
                            attributes: ['id', 'name', 'username', 'role'],
                        });
                        if (findUser === null || findUser.id !== decodedToken.data.id)
                            return res.status(ERR[403].statusCode).send(ERR[403].send);
                        req.user = findUser;
                        next();
                    }
                    catch (error) {
                        res.status(500).send({
                            code: -1,
                            message: 'Internal Server Error',
                            data: null,
                            stack: error,
                        });
                    }
                });
            });
        }
        else {
            return res.status(ERR[403].statusCode).send(ERR[403].send);
        }
    }
    catch (error) {
        return res.status(error.statusCode).send(error.send);
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map