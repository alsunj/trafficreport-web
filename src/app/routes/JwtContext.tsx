import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { IJwtResponse } from "@/app/dto/IJwtResponse";
import {setJwtToken} from "@/app/routes/Identity/apiClient";


interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: (data: IJwtResponse | null) => void;
}

export const JwtContext = createContext<JwtContextProps | null>(null);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [jwtResponse, setJwtResponse] = useState<IJwtResponse | null>(null);

    useEffect(() => {
        setJwtToken(jwtResponse?.token || null);
    }, [jwtResponse]);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            {children}
        </JwtContext.Provider>
    );
};