import type { IVehicleViolation } from "../types/IViolations";
import {BaseService} from "@/app/services/BaseService";
export class VehicleViolationService extends BaseService<IVehicleViolation>{
    constructor(endpoint: string) {
        super(endpoint);
    }
  }