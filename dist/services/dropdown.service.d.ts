import { ResponseList } from '../interfaces/ResponseList.interface';
declare class DropdownService {
    Unit: typeof import("../models/unit.model").UnitModel;
    UnitSize: typeof import("../models/unit_size.model").UnitSizeModel;
    Type: typeof import("../models/type.model").TypeModel;
    unitDropdownList(page: number, dataPerPage: number, search?: string, unitSizeId?: any): Promise<ResponseList>;
    unitSizeDropdownList(page: number, dataPerPage: number, search?: string, unitId?: number): Promise<ResponseList>;
    typeDropdownList(page: number, dataPerPage: number, search?: string): Promise<ResponseList>;
}
export default DropdownService;
