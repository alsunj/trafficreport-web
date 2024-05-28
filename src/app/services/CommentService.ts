import type { IComment } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
export class CommentService extends BaseService<IComment> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
