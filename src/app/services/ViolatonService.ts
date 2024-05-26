import type { IViolation } from "../types/IViolations";
export class ViolationService {
    private endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
  
    async getAll(): Promise<IViolation[]> {
      const response = await fetch(this.endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    }
  }
  
  