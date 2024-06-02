import type { IComment } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
import customMap from "@/app/Components/customMap";

export class CommentService extends BaseService<IComment> {
    constructor(endpoint: string) {
        super(endpoint);
    }
    async getAllById(id: string): Promise<IComment[]> {
        try {
            const response = await this.axios.get<IComment[]>(`/${id}`);
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
