"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageWhatsappQueue = exports.uploadImage = exports.generateRandomPassword = exports.generateAccessTokenAdmin = exports.generateAccessTokenOfficer = void 0;
exports.calculatePercentage = calculatePercentage;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
const axios_1 = tslib_1.__importDefault(require("axios"));
// import Redis from 'ioredis';
// 
// const redis = new Redis();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const generateAccessTokenOfficer = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY_MOBILE;
    const data = {
        sub: process.env.JWT_SUB,
        data: Object.assign({}, payload),
    };
    const Generate = jsonwebtoken_1.default.sign(data, secretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return Generate;
};
exports.generateAccessTokenOfficer = generateAccessTokenOfficer;
const generateAccessTokenAdmin = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY_WEB;
    const data = {
        sub: process.env.JWT_SUB,
        data: Object.assign({}, payload),
    };
    const Generate = jsonwebtoken_1.default.sign(data, secretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return Generate;
};
exports.generateAccessTokenAdmin = generateAccessTokenAdmin;
function calculatePercentage(num, grandTotal) {
    if (grandTotal === 0) {
        return 0; // Avoid division by zero
    }
    const percentage = (num / grandTotal) * 100;
    // Determine the number of decimals based on the size of the percentage
    let decimalPlaces;
    if (percentage >= 1) {
        decimalPlaces = 2; // If percentage >= 1%, use 2 decimal places
    }
    else if (percentage >= 0.01) {
        decimalPlaces = 4; // If 0.01% <= percentage < 1%, use 4 decimal places
    }
    else if (percentage >= 0.0001) {
        decimalPlaces = 6; // If 0.0001% <= percentage < 0.01%, use 6 decimal places
    }
    else {
        decimalPlaces = 8; // For anything smaller, use 8 decimal places
    }
    // Return the percentage with the calculated number of decimal places
    return parseFloat(percentage.toFixed(decimalPlaces));
}
const generateRandomPassword = (length = 12) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};
exports.generateRandomPassword = generateRandomPassword;
const uploadImage = async (imageBuffer) => {
    try {
        const compressedImageBuffer = await (0, sharp_1.default)(imageBuffer)
            .jpeg({ quality: 20, mozjpeg: true })
            .toBuffer();
        return new Promise((resolve, reject) => {
            cloudinary_1.default.v2.uploader
                .upload_stream({ resource_type: 'image', quality: 'auto' }, (error, result) => {
                if (error) {
                    console.error('Upload Error:', error);
                    return reject('Upload failed.');
                }
                resolve(result.secure_url);
            })
                .end(compressedImageBuffer);
        });
    }
    catch (error) {
        console.error('Error:', error);
        throw new Error('Error processing image.');
    }
};
exports.uploadImage = uploadImage;
const sendMessageWhatsappQueue = async ({ phoneNumber, type, message, }) => {
    try {
        const authToken = process.env.WHATSAPP_AUTH_TOKEN;
        const instance = process.env.WHATSAPP_INSTANCE;
        const response = await axios_1.default.post(`https://core.maxchat.id/${instance}/api/queue`, {
            to: phoneNumber,
            type: type,
            text: message,
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error sending message.');
    }
};
exports.sendMessageWhatsappQueue = sendMessageWhatsappQueue;
// export async function acquireLock(key: string, ttl: number): Promise<boolean> {
// 	const exists = await redis.exists(key);
// 	if (exists) {
// 		return false; 
// 	}
// 	await redis.set(key, 'locked', 'PX', ttl);
// 	return true;
// }
// export async function releaseLock(key: string): Promise<void> {
// 	await redis.del(key);
// }
//# sourceMappingURL=utils.utils.js.map