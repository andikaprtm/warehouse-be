"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databases_1 = tslib_1.__importDefault(require("../databases"));
const sequelize_1 = require("sequelize");
class DropdownService {
    constructor() {
        this.Unit = databases_1.default.Unit;
        this.UnitSize = databases_1.default.UnitSize;
        this.Type = databases_1.default.Type;
    }
    async unitDropdownList(page, dataPerPage, search = null, unitSizeId = null) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                offset: offset,
                limit: dataPerPage,
                where: {},
            };
            if (search) {
                const searchCondition = {
                    [sequelize_1.Op.or]: [
                        { code: { [sequelize_1.Op.iLike]: `%${search}%` } },
                        { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    ],
                };
                condition.where = Object.assign(Object.assign({}, condition.where), searchCondition);
            }
            if (unitSizeId) {
                condition.where = Object.assign(Object.assign({}, condition.where), { unit_size_id: unitSizeId });
            }
            const { count, rows } = await this.Unit.findAndCountAll(condition);
            const next = page * dataPerPage < count;
            const pageTotal = Math.ceil(count / dataPerPage);
            return {
                data: rows,
                page: page,
                dataPerPage: dataPerPage,
                count: count,
                next: next,
                totalCount: count,
                pageTotal: pageTotal,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async unitSizeDropdownList(page, dataPerPage, search = null, unitId = null) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                offset: offset,
                limit: dataPerPage,
                where: {},
            };
            if (search) {
                const searchCondition = {
                    [sequelize_1.Op.or]: [
                        { code: { [sequelize_1.Op.iLike]: `%${search}%` } },
                        { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    ],
                };
                condition.where = Object.assign(Object.assign({}, condition.where), searchCondition);
            }
            if (unitId) {
                condition.where = Object.assign(Object.assign({}, condition.where), { unit_size_id: unitId });
            }
            const { count, rows } = await this.UnitSize.findAndCountAll(condition);
            const next = page * dataPerPage < count;
            const pageTotal = Math.ceil(count / dataPerPage);
            return {
                data: rows,
                page: page,
                dataPerPage: dataPerPage,
                count: count,
                next: next,
                totalCount: count,
                pageTotal: pageTotal,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async typeDropdownList(page, dataPerPage, search = null) {
        try {
            const offset = page * dataPerPage - dataPerPage;
            const condition = {
                offset: offset,
                limit: dataPerPage,
                where: {},
            };
            if (search) {
                const searchCondition = {
                    [sequelize_1.Op.or]: [
                        { code: { [sequelize_1.Op.iLike]: `%${search}%` } },
                        { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    ],
                };
                condition.where = Object.assign(Object.assign({}, condition.where), searchCondition);
            }
            const { count, rows } = await this.Type.findAndCountAll(condition);
            const next = page * dataPerPage < count;
            const pageTotal = Math.ceil(count / dataPerPage);
            return {
                data: rows,
                page: page,
                dataPerPage: dataPerPage,
                count: count,
                next: next,
                totalCount: count,
                pageTotal: pageTotal,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = DropdownService;
//# sourceMappingURL=dropdown.service.js.map