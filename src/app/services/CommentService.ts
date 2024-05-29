import type { IComment } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";

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
            return []; // Return an empty array if response status is not 200
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return []; // Return an empty array if an error occurs
        }
    }
    
}
