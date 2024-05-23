"use client";

import React from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from './Components/customMap';
export default function Home() 
{
  const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4'
  const position = { lat: 58.68, lng: 25}
  return (
      <APIProvider apiKey='AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4'>
      <div style ={{height:"100vh"}}>
      <CustomMap/>
      </div>
      </APIProvider>
  );
}
