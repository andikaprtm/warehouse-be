declare class StockValidationService {
    Product: typeof import("../models/product.model").ProductModel;
    stockCheck(data: Array<{
        productCode: string;
        quantity: number;
    }>): Promise<any>;
}
export default StockValidationService;
