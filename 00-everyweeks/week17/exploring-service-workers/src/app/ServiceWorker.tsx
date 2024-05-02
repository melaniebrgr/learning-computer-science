'use client';

import { use, useEffect, useRef, useState } from "react";

function NetworkIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (isOnline ? "🟢" : "🔴");
}

export function ServiceWorker() {
  const scvworker = useRef<ServiceWorker | null>();
  const scvregistration = useRef<ServiceWorkerRegistration>();

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        scvregistration.current = await navigator.serviceWorker.register("/service-worker.js", {
          updateViaCache: "none",
        });
      } catch (error) {
        console.error("Failed to register service worker", error);
      }
      console.log("Service worker registered", scvregistration.current);
    }

    scvworker.current = scvregistration.current.installing || scvregistration.current.waiting || scvregistration.current.active;
  
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // If this event listener fires, we have a new service worker controlling the page
      scvworker.current = navigator.serviceWorker.controller;
    });
  }



  useEffect(() => {
    registerServiceWorker();
  });
  
  return <NetworkIndicator />;
}