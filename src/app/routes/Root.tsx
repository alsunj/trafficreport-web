import { APIProvider } from "@vis.gl/react-google-maps";
import { createContext, useState } from "react";
import { IJwtResponse } from "../dto/IJwtResponse";
import CustomMap from "../Components/customMap";
import type { IVehicle } from "../types/IVehicles";
import type { IVehicleType } from "../types/IVehicles";
import type { IComment } from "../types/IEvidences";
import type { IEvidenceType } from "../types/IEvidences";
import type { IEvidence } from "../types/IEvidences";
import type { IViolation } from "../types/IViolations";
import type { IVehicleViolation } from "../types/IViolations";
import { VehicleContext } from "../store/vehicleStore";
import { ViolationContext } from "../store/violationStore";
import { EvidenceContext } from "../store/evidenceStore";

interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: ((data: IJwtResponse) => void) | null;
  }
  
  export const JwtContext = createContext<JwtContextProps>({
    jwtResponse: null,
    setJwtResponse: null,
  });




const Root = () => {
    const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);
    const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[] | null>(null);
    const [eVehicleSizes, setEVehicleSizes] = useState<string[] | null>(null);    
    const [jwtResponse, setJwtResponse] = useState<IJwtResponse | null>(null);
    const [violations, setViolations] = useState<IViolation[] | null>(null);
    const [eViolationTypes, setEViolationTypes] = useState<string[] | null>(null);
    const [vehicleViolations, setVehicleViolations] = useState<IVehicleViolation[] | null>(null);
    const [evidences, setEvidences] = useState<IEvidence[] | null>(null);
    const [evidenceTypes, setEvidenceTypes] = useState<IEvidenceType[] | null>(null);
    const [comments, setComments] = useState<IComment[] | null>(null);

    const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4'
    return ( 
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            <VehicleContext.Provider value={{ vehicles, vehicleTypes, eVehicleSizes, setVehicles, setVehicleTypes, setEVehicleSizes}}>
            <ViolationContext.Provider value={{ violations, eViolationTypes, vehicleViolations, setViolations, setEViolationTypes, setVehicleViolations }}>
            <EvidenceContext.Provider value={{ evidences, evidenceTypes, comments, setEvidences, setEvidenceTypes, setComments }}>
                <div className="blur-circle blur-circle-1-color blur-circle-1-location blur-circle-container"></div>
                <div className="blur-circle blur-circle-1-color blur-circle-2-location blur-circle-container"></div>
                <div className="blur-circle blur-circle-2-color blur-circle-3-location blur-circle-container"></div>
                <div className="blur-circle blur-circle-2-color blur-circle-4-location blur-circle-container"></div>
                <APIProvider apiKey={API_KEY}>
                    <div style={{ height: "100vh" }}>
                        <main role="main" className="pb-3">
                            <CustomMap />
                        </main>
                    </div>
                </APIProvider>
                </EvidenceContext.Provider>
             </ViolationContext.Provider>
            </VehicleContext.Provider>
        </JwtContext.Provider>
    );
  }
  export default Root;
  