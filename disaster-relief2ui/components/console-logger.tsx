"use client"

import { useEffect } from "react"

export function ConsoleLogger() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Store the original fetch
      const originalFetch = window.fetch;
      
      // Prevent multiple wrapping if component re-renders
      if ((window as any).__fetchLogged) return;
      (window as any).__fetchLogged = true;

      window.fetch = async function (...args) {
        const [resource, config] = args;
        console.groupCollapsed(`🌐 API Request: ${typeof resource === 'string' ? resource : resource instanceof Request ? resource.url : 'Unknown URL'}`);
        console.log(`[CONFIG]`, config || 'No config provided');
        
        try {
          const response = await originalFetch.apply(this, args);
          const responseClone = response.clone();
          
          console.log(`[STATUS]`, responseClone.status, responseClone.statusText);
          
          try {
            const data = await responseClone.json();
            console.log(`[RESPONSE DATA]`, data);
          } catch (e) {
            try {
              const text = await responseClone.text();
              console.log(`[RESPONSE TEXT]`, text);
            } catch (err) {
              console.log(`[RESPONSE] Could not parse body`);
            }
          }
          console.groupEnd();
          return response;
        } catch (error) {
          console.error(`[FETCH ERROR]`, error);
          console.groupEnd();
          throw error;
        }
      };
      
      console.log('✅ Global fetch console logger initialized.');
    }
  }, []);

  return null;
}
