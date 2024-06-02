import { APIProvider } from "@vis.gl/react-google-maps";
import { createContext, useState, ReactNode, useCallback, useContext, useEffect } from "react";
import CustomMap from "../Components/customMap";
import { JwtProvider, JwtContext } from "@/app/routes/JwtContext";

const Root = () => {
    const [mapKey, setMapKey] = useState(0); // Add state to trigger map refresh
    const refreshMap = useCallback(() => {
        setMapKey(prevKey => prevKey + 1); // Increment key to force re-render
    }, []);


    const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4';
    return (
        <APIProvider apiKey={API_KEY}>
            <div style={{ height: "100vh" }}>
                <main role="main" className="pb-3">
                    <CustomMap key={mapKey} refreshMap={refreshMap}/>
                </main>
            </div>
        </APIProvider>
    );
}

const RootWithJwtProvider = () => (
    <JwtProvider>
        <Root />
    </JwtProvider>
);

export default RootWithJwtProvider;
