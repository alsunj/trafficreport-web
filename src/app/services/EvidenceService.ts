import type { IEvidence } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
export class EvidenceService extends BaseService<IEvidence> {
    constructor(endpoint: string) {
        super(endpoint);
    }
}
