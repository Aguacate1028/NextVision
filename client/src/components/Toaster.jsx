import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right" 
      richColors 
      toastOptions={{
        style: { borderRadius: '20px', border: '1px solid #E0F2FE' },
      }} 
    />
  );
}