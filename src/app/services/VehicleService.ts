import type { IVehicle } from "../types/IVehicles";
import {BaseService} from "@/app/services/BaseService";
import customMap from "@/app/Components/customMap";
export class VehicleService extends BaseService<IVehicle> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
