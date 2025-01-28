"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromWasabi = exports.uploadImageToWasabi = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const uuid_1 = require("uuid"); // Import the UUID library
// Configure the Wasabi Endpoint
const wasabiEndpoint = new aws_sdk_1.default.Endpoint('s3.ap-southeast-1.wasabisys.com');
const s3 = new aws_sdk_1.default.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: process.env.WASABI_ACCESS_KEY, // Replace with your Wasabi Access Key
    secretAccessKey: process.env.WASABI_SECRET_KEY, // Replace with your Wasabi Secret Key
    region: process.env.WASABI_REGION,
});
const uploadImageToWasabi = async (imageBuffer, bucketName) => {
    try {
        const compressedImageBuffer = await (0, sharp_1.default)(imageBuffer)
            .jpeg({ quality: 20, mozjpeg: true })
            .toBuffer();
        const randomFileName = `${(0, uuid_1.v4)()}.jpg`;
        const params = {
            Bucket: bucketName,
            Key: randomFileName,
            Body: compressedImageBuffer,
            ContentType: 'image/jpeg',
        };
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully to ${data.Location}`);
        return {
            url: data.Location,
            fileName: randomFileName,
        };
    }
    catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Upload to Wasabi failed.');
    }
};
exports.uploadImageToWasabi = uploadImageToWasabi;
const deleteImageFromWasabi = async (bucketName, fileName) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: fileName,
        };
        await s3.deleteObject(params).promise();
        console.log(`File deleted successfully from Wasabi.`);
    }
    catch (error) {
        console.error('Error deleting image:', error);
        throw new Error('Delete from Wasabi failed.');
    }
};
exports.deleteImageFromWasabi = deleteImageFromWasabi;
//# sourceMappingURL=wasabi.util.js.map