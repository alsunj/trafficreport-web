import { createContext } from 'react';
import type { IVehicle } from "../types/IVehicles";
import type { IVehicleType } from "../types/IVehicles";

export interface VehicleContextProps {
    vehicles: IVehicle[] | null;
    vehicleTypes: IVehicleType[]| null;
    eVehicleSizes: string[] | null;
    setVehicles: ((vehicles: IVehicle[]) => void) | null;
    setVehicleTypes: ((vehicleTypes: IVehicleType[]) => void) | null;
    setEVehicleSizes: ((eVehicleSizes: string[]) => void) | null;
  }
  export const VehicleContext = createContext<VehicleContextProps>({
    vehicles: null,
    vehicleTypes: null,
    eVehicleSizes: null,
    setVehicles: null,
    setVehicleTypes: null,
    setEVehicleSizes: null,
  });


  

