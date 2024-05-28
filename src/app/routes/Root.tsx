import { APIProvider } from "@vis.gl/react-google-maps";
import { createContext, useState } from "react";
import { IJwtResponse } from "../dto/IJwtResponse";
import CustomMap from "../Components/customMap";
import { ReactNode } from "react";

interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: ((data: IJwtResponse) => void) | null;
  }
  
  export const JwtContext = createContext<JwtContextProps>({
    jwtResponse: null,
    setJwtResponse: null,
  });

  export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [jwtResponse, setJwtResponse] = useState<IJwtResponse | null>(null);
  
    return (
      <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
        {children}
      </JwtContext.Provider>
    );
  };


const Root = () => {
    const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4'
    return ( 
      <JwtProvider>           
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

      </JwtProvider>
    );
  }
  export default Root;
  