"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
const HttpException_1 = require("../exceptions/HttpException");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const utils_utils_1 = require("../utils/utils.utils");
class UserService {
    constructor() {
        this.User = databases_1.default.User;
    }
    async findUserById(id) {
        try {
            const user = await this.User.findByPk(id, {
                attributes: { exclude: ['password'] },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(data, transaction) {
        try {
            const user = await this.User.count({
                where: { id: data.id },
            });
            if (!user) {
                throw new HttpException_1.HttpException(400, 'User not found');
            }
            const updateData = {};
            Object.keys(data).forEach((key) => {
                if (data[key] !== undefined && data[key] !== null) {
                    if (key === 'password') {
                        const salt = bcrypt_1.default.genSaltSync(10);
                        const hash = bcrypt_1.default.hashSync(data[key], salt);
                        updateData[key] = hash;
                    }
                    else {
                        updateData[key] = data[key];
                    }
                }
            });
            // Update the user
            const updated = await this.User.update(updateData, Object.assign({ where: { id: data.id } }, (transaction ? { transaction } : {})));
            if (!updated[0]) {
                throw new HttpException_1.HttpException(500, 'Failed to update user');
            }
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
    async loginWeb(username, password) {
        try {
            const user = await this.User.findOne({
                where: {
                    username: username,
                },
            });
            if (!user) {
                throw new HttpException_1.HttpException(409, `username or password is wrong`);
            }
            const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new HttpException_1.HttpException(409, `username or password is wrong`);
            }
            const fullUser = await this.findUserById(user.id);
            const payload = {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
            };
            const token = (0, utils_utils_1.generateAccessTokenAdmin)(payload);
            const result = {
                token: token,
                user: fullUser,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async logout($token) { }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map