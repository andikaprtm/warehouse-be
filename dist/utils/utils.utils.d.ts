export declare const generateAccessTokenOfficer: any;
export declare const generateAccessTokenAdmin: any;
export declare function calculatePercentage(num: any, grandTotal: any): number;
export declare const generateRandomPassword: any;
export declare const uploadImage: (imageBuffer: Buffer) => Promise<string>;
export declare const sendMessageWhatsappQueue: ({ phoneNumber, type, message, }: {
    phoneNumber: string;
    type: string;
    message: string;
}) => Promise<any>;
