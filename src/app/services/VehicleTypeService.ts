import type { IVehicleType } from "../types/IVehicles";
import {BaseService} from "@/app/services/BaseService";
export class VehicleTypeService extends BaseService<IVehicleType> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
