import { Routes } from '../../interfaces/routes.interface';
import ProductController from '../../controllers/product.controller';
declare class ProductRoute implements Routes {
    router: import("express-serve-static-core").Router;
    productController: ProductController;
    constructor();
    private initializeRoutes;
}
export default ProductRoute;
