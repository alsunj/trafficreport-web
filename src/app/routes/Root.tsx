import { APIProvider } from "@vis.gl/react-google-maps";
import {createContext, useState, ReactNode, useCallback, useContext} from "react";
import { IJwtResponse } from "../dto/IJwtResponse";
import CustomMap from "../Components/customMap";

interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: (data: IJwtResponse | null) => void;
}

export const JwtContext = createContext<{
    jwtResponse: IJwtResponse | null,
    setJwtResponse: ((data: IJwtResponse) => void) | null}>({jwtResponse: null, setJwtResponse: null});

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [jwtResponse, setJwtResponse] = useState<IJwtResponse | null>(null);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            {children}
        </JwtContext.Provider>
    );
};

const Root = () => {

    const { jwtResponse } = useContext(JwtContext);
    const jwt = jwtResponse ? jwtResponse.token : '';
    const [mapKey, setMapKey] = useState(0); // Add state to trigger map refresh
    const refreshMap = useCallback(() => {
        setMapKey(prevKey => prevKey + 1); // Increment key to force re-render
      }, []);
    
    const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4';
    return (
        <JwtProvider>
            <APIProvider apiKey={API_KEY}>
                <div style={{ height: "100vh" }}>
                    <main role="main" className="pb-3">
                    <CustomMap key={mapKey} refreshMap={refreshMap} jwt={jwt} />
                    </main>
                </div>
            </APIProvider>
        </JwtProvider>
    );
}

export default Root;
