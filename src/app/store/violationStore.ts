import { createContext } from "react";
import type { IViolation } from "../types/IViolations";
import type { IVehicleViolation } from "../types/IViolations";

export interface ViolationContextProps{
    violations: IViolation [] | null;
    eViolationTypes: string[] | null; // Adjusted type here
    vehicleViolations: IVehicleViolation []| null;
    setViolations: ((violations: IViolation[]) => void) | null;
    setEViolationTypes: ((eViolationTypes: string[])=>void)| null;
    setVehicleViolations: ((vehicleViolations: IVehicleViolation[])=> void)|null;
}
export const ViolationContext = createContext<ViolationContextProps>({
    violations: null,
    eViolationTypes: null,
    vehicleViolations: null,
    setViolations: null,
    setEViolationTypes: null,
    setVehicleViolations: null,
});