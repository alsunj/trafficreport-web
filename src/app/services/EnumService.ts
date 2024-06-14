import {BaseService} from "@/app/services/BaseService";
export class EnumService extends BaseService<string>{
    constructor(endpoint: string) {
        super(endpoint);
    }
  }