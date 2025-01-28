export declare const uploadImageToWasabi: (imageBuffer: Buffer, bucketName: string) => Promise<{
    url: string;
    fileName: string;
}>;
export declare const deleteImageFromWasabi: (bucketName: string, fileName: string) => Promise<void>;
