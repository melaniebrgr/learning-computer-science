'use client';

import { useEffect, useRef } from "react";

export function WebWorker() {
  const { current: worker } = useRef(new Worker("./worker.js"));

  useEffect(() => {
    worker.addEventListener("message", (e: MessageEvent) => {
      console.log('Message received in react:', e.data);
    });
  }, []);

  const postMessage = () => {
    worker.postMessage("from react");
  }

  return <button onClick={postMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Run Web Worker</button>;
}
