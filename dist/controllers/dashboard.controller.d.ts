import { Request, Response, NextFunction } from 'express';
import DashboardService from '../services/dashboard.service';
declare class DashboardController {
    dashboardService: DashboardService;
    getBatchData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default DashboardController;
