import type { IEvidence } from "../types/IEvidences";
import {BaseService} from "@/app/services/BaseService";
import type { IResultObject } from "../types/IResultObject";


export class EvidenceService extends BaseService<IEvidence> {
    constructor(endpoint: string) {
        super(endpoint);
    }
  
    async postWithFile(entity: IEvidence, file: File): Promise<IResultObject<IEvidence>> {
      try {
          // Create a FormData object
          const formData = new FormData();
  
          // Append the file to the form data
          formData.append('file', file);
  
          // Append other properties from the entity to the form data
          for (const key in entity) {
              if (entity.hasOwnProperty(key)) {
                  formData.append(key, (entity as any)[key]);
              }
          }
  
          // Send the POST request with the form data
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