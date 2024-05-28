import type { IAdditionalVehicle } from "../types/IVehicles";
import {BaseService} from "@/app/services/BaseService";
export class AdditionalVehicleService extends BaseService<IAdditionalVehicle> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
