import type { IVehicleViolation } from "../types/IViolations";
import {BaseService} from "@/app/services/BaseService";
export class VehicleViolationService extends BaseService<IVehicleViolation>{
    constructor(endpoint: string) {
        super(endpoint);
    }
    async getAllByRegNr(regNr: string): Promise<IVehicleViolation[]> {
        try {
            const response = await this.axios.get<IVehicleViolation[]>(`/${regNr}`);
            if (response.status === 200) {
                return response.data;
            }
            return []; // Return an empty array if response status is not 200
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return []; // Return an empty array if an error occurs
        }
    }
  }