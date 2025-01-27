import AWS from 'aws-sdk';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

// Configure the Wasabi Endpoint
const wasabiEndpoint = new AWS.Endpoint('s3.ap-southeast-1.wasabisys.com');

const s3 = new AWS.S3({
	endpoint: wasabiEndpoint,
	accessKeyId: process.env.WASABI_ACCESS_KEY, // Replace with your Wasabi Access Key
	secretAccessKey: process.env.WASABI_SECRET_KEY, // Replace with your Wasabi Secret Key
	region: process.env.WASABI_REGION,
});

export const uploadImageToWasabi = async (
	imageBuffer: Buffer,
	bucketName: string
): Promise<{
	url: string;
	fileName: string;
}> => {
	try {
		const compressedImageBuffer = await sharp(imageBuffer)
			.jpeg({ quality: 20, mozjpeg: true }) 
			.toBuffer();

		const randomFileName = `${uuidv4()}.jpg`; 

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
		}
	} catch (error) {
		console.error('Error uploading image:', error);
		throw new Error('Upload to Wasabi failed.');
	}
};

export const deleteImageFromWasabi = async (
	bucketName: string,
	fileName: string
): Promise<void> => {
	try {
		const params = {
			Bucket: bucketName,
			Key: fileName, 
		};

		await s3.deleteObject(params).promise();
		console.log(`File deleted successfully from Wasabi.`);
	} catch (error) {
		console.error('Error deleting image:', error);
		throw new Error('Delete from Wasabi failed.');
	}
};
