"use client";
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import Root from './routes/Root';
export default function Home() 
{
  return (
    <BrowserRouter>
      <div style ={{height:"20vh"}}>
        <Root/>
      </div>
    </BrowserRouter>
  
  );
}
