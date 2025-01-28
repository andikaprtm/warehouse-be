import { Routes } from '../interfaces/routes.interface';
import DropdownController from '../controllers/dropdown.controller';
declare class DropdownRoute implements Routes {
    router: import("express-serve-static-core").Router;
    DropdownController: DropdownController;
    constructor();
    private initializeRoutes;
}
export default DropdownRoute;
