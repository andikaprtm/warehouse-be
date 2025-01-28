import { Response, NextFunction } from 'express';
import ProductService from '../services/product.service';
declare class ProductController {
    ProductService: ProductService;
    getListProduct: (req: any, res: Response, next: NextFunction) => Promise<void>;
    getDetailProduct: (req: any, res: Response, next: NextFunction) => Promise<void>;
    updateProduct: (req: any, res: Response, next: NextFunction) => Promise<void>;
    deleteProduct: (req: any, res: Response, next: NextFunction) => Promise<void>;
    createProduct: (req: any, res: Response, next: NextFunction) => Promise<void>;
    getListProductHistory: (req: any, res: Response, next: NextFunction) => Promise<void>;
}
export default ProductController;
