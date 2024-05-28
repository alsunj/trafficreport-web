import type { IEvidenceType } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
export class EvidenceTypeService extends BaseService<IEvidenceType> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
