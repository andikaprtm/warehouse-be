"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const path_1 = tslib_1.__importDefault(require("path"));
const HttpException_1 = require("../exceptions/HttpException");
const uploadPath = path_1.default.join(__dirname, '../../uploads');
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `PP${(0, moment_1.default)().format('DDMMYYmmss')}_${file.originalname}`);
    },
});
const imageFieldsMimeType = ['image/jpeg', 'image/png', 'image/jpg'];
const multerFilter = (req, file, cb) => {
    if (imageFieldsMimeType.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new HttpException_1.HttpException(400, 'Only jpg, jpeg, png'));
    }
};
const uploadMiddleware = (req, res, next) => {
    const upload = (0, multer_1.default)({
        storage: multerStorage,
        fileFilter: multerFilter,
    }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return next(err); // Pass the error to the next middleware (error middleware)
        }
        next();
    });
};
exports.uploadMiddleware = uploadMiddleware;
//# sourceMappingURL=upload.middleware.js.map