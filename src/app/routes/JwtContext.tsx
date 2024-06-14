import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { IJwtResponse } from "@/app/dto/IJwtResponse";
import { setJwtToken } from "@/app/routes/Identity/apiClient";
interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: (data: IJwtResponse | null) => void;
}

export const JwtContext = createContext<JwtContextProps | null>(null);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [jwtResponse, setJwtResponseState] = useState<IJwtResponse | null>(() => {
        if (typeof window !== 'undefined') {
            const storedJwt = localStorage.getItem('jwtResponse');
            return storedJwt ? JSON.parse(storedJwt) : null;
        }
        return null;
    });

    useEffect(() => {
        if (jwtResponse) {
            localStorage.setItem('jwtResponse', JSON.stringify(jwtResponse));
        } else {
            localStorage.removeItem('jwtResponse');
        }
        setJwtToken(jwtResponse?.token || null);
    }, [jwtResponse]);

    const setJwtResponse = (data: IJwtResponse | null) => {
        setJwtResponseState(data);
    };

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            {children}
        </JwtContext.Provider>
    );
};