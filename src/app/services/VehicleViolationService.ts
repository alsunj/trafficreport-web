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
    async getById(id: string): Promise<IVehicleViolation> {
        const url = `${this.endpoint}/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle violation');
        }
        return await response.json();
    }
    async postViolation(violationData: IVehicleViolation): Promise<void> {
        try {
          const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(violationData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to post violation data');
          }
        } catch (error) {
          throw new Error(`Error posting violation data: `);
        }
      }
  }
  
  