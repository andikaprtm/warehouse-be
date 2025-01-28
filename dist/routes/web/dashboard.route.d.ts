import { Routes } from '../../interfaces/routes.interface';
import DashboardController from '../../controllers/dashboard.controller';
declare class DashboardRoute implements Routes {
    router: import("express-serve-static-core").Router;
    dashboardController: DashboardController;
    constructor();
    private initializeRoutes;
}
export default DashboardRoute;
