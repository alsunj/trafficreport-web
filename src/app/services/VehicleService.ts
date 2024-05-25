import type { IVehicle } from "../types/IVehicles";
export class VehicleService {
    private endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }

  async getAll(): Promise<IVehicle[]> {
    const response = await fetch(this.endpoint);
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
  }
}
