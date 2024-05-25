import type { IVehicleViolation } from "../types/IViolations";
export class VehicleViolationService {
    private endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
  
    async getAll(): Promise<IVehicleViolation[]> {
      const response = await fetch(this.endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    }
  }
  
  