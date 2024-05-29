import type { IAdditionalVehicle } from "../types/IVehicles";
import {BaseService} from "@/app/services/BaseService";
export class AdditionalVehicleService extends BaseService<IAdditionalVehicle> {
    constructor(endpoint: string) {
        super(endpoint);
    }

    async getAllById(id: string): Promise<IAdditionalVehicle[]> {
        try {
            const response = await this.axios.get<IAdditionalVehicle[]>(`/${id}`);
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
