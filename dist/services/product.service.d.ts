import { Product } from '../models/product.model';
import { ResponseList } from '../interfaces/ResponseList.interface';
import { Transaction } from 'sequelize';
declare class ProductService {
    User: typeof import("../models/user.model").UserModel;
    Product: typeof import("../models/product.model").ProductModel;
    Unit: typeof import("../models/unit.model").UnitModel;
    UnitSize: typeof import("../models/unit_size.model").UnitSizeModel;
    Type: typeof import("../models/type.model").TypeModel;
    ProductHistory: typeof import("../models/product-history.model").ProductHistoryModel;
    getListProduct(page: number, dataPerPage: number, query: any): Promise<ResponseList>;
    getProductById(id: number): Promise<Product>;
    createProduct(data: any, transaction?: Transaction): Promise<Product>;
    updateProduct(id: number, data: any): Promise<Product>;
    deleteProduct(id: number): Promise<Product>;
    getListProductHistory(page: number, dataPerPage: number, query: any): Promise<ResponseList>;
}
export default ProductService;
