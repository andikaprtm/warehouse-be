declare class DashboardService {
    Product: typeof import("../models/product.model").ProductModel;
    TransactionModel: typeof import("../models/transaction.model").TransactionModel;
    getDashboardData(year?: any): Promise<{
        availableProducts: number;
        totalAvailableProductQuantity: number;
        transactionData: any[];
    }>;
}
export default DashboardService;
