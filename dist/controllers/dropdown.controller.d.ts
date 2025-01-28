import { Response, NextFunction } from 'express';
import DropdownService from '../services/dropdown.service';
declare class DropdownController {
    DropdownService: DropdownService;
    getUnitDropdownList: (req: any, res: Response, next: NextFunction) => Promise<void>;
    getUnitSizeDropdownList: (req: any, res: Response, next: NextFunction) => Promise<void>;
    getTypeDropdownList: (req: any, res: Response, next: NextFunction) => Promise<void>;
}
export default DropdownController;
