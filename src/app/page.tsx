"use client";
import React from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState,useCallback } from 'react';
import { JwtProvider } from './routes/JwtContext';
import CustomMap from './Components/customMap';
const Home = () => {
  const [mapKey, setMapKey] = useState(0);
  const refreshMap = useCallback(() => {
      setMapKey(prevKey => prevKey + 1);
  }, []);

  const API_KEY = process.env.REACT_APP_MAPS_KEY || 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4';
  return (
      <JwtProvider>
          <APIProvider apiKey={API_KEY}>
              <div style={{ height: "100vh" }}>
                  <main role="main" className="pb-3">
                      <CustomMap key={mapKey} refreshMap={refreshMap} />
                  </main>
              </div>
          </APIProvider>
      </JwtProvider>
  );
};
export default Home;

