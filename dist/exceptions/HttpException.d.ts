export declare class HttpException implements HttpException {
    code: number;
    data?: any;
    message: any[];
    stack: any;
    constructor(status: number, message?: any, data?: any, stack?: any);
}
