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
            return [];
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
}
}
