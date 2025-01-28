"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleMiddleware = (options) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!options.roles.includes(user.role)) {
                return res.status(403).send({ code: 0, message: 'Forbidden', data: null });
            }
            next();
        }
        catch (error) {
            return res.status(error.statusCode || 500).send({ message: error.message });
        }
    };
};
exports.default = RoleMiddleware;
//# sourceMappingURL=role.middleware.js.map