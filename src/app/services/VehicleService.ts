import type { IVehicle } from "../types/IVehicles";
import {BaseService} from "@/app/services/BaseService";
export class VehicleService extends BaseService<IVehicle> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
