import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { IJwtResponse } from "@/app/dto/IJwtResponse";
import { setJwtToken } from "@/app/routes/Identity/apiClient";

interface JwtContextProps {
    jwtResponse: IJwtResponse | null;
    setJwtResponse: (data: IJwtResponse | null) => void;
}

export const JwtContext = createContext<JwtContextProps | null>(null);


// Need to save in local storage to survive page refresh
export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [jwtResponse, setJwtResponseState] = useState<IJwtResponse | null>(() => {
        const storedJwt = localStorage.getItem('jwtResponse');
        return storedJwt ? JSON.parse(storedJwt) : null;
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
