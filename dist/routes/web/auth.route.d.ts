import { Routes } from '../../interfaces/routes.interface';
import AuthController from '../../controllers/auth.controller';
declare class AuthRoute implements Routes {
    router: import("express-serve-static-core").Router;
    AuthController: AuthController;
    constructor();
    private initializeRoutes;
}
export default AuthRoute;
