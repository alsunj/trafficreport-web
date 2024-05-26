import type { IViolation } from "../types/IViolations";
import {BaseService} from "@/app/services/BaseService";
export class ViolationService extends BaseService<IViolation>{
    constructor(endpoint: string) {
        super(endpoint);
    }
  }