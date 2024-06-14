import type { IEvidence } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
import type { IResultObject } from "../types/IResultObject";


export class EvidenceService extends BaseService<IEvidence> {
    constructor(endpoint: string) {
        super(endpoint);
    }
  
    async postWithFile(entity: IEvidence, file: File): Promise<IResultObject<IEvidence>> {
      try {

          const formData = new FormData();
          formData.append('file', file);

          for (const key in entity) {
              if (entity.hasOwnProperty(key)) {
                  formData.append(key, (entity as any)[key]);
              }
          }

          let response = await this.axios.post('', formData, {
              headers: {
                  'Authorization': 'Bearer your-token-here',
                  'Content-Type': 'multipart/form-data'
              }
          });
  
          return {
              data: response.data
          };
      } catch (error: any) {
          return {
              errors: [JSON.stringify(error)]
          };
      }
  }
  async getAllById(id: string): Promise<IEvidence[]> {
    try {
        const response = await this.axios.get<IEvidence[]>(`/${id}`);
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