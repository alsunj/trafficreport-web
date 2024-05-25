"use client";
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import Root from './routes/Root';
export default function Home() 
{
  const API_KEY = 'AIzaSyALWYKCItcOvaUOvqRGcMw4WhmeITlw8r4'
  const position = { lat: 58.68, lng: 25}
  return (
    <BrowserRouter>

      <div style ={{height:"20vh"}}>
        <Root/>
      </div>
    </BrowserRouter>
  
  );
}
