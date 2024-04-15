'use client';

export function WebWorker() {
  const runWorker = () => {
    console.log("Running Web Worker");
    
    const worker = new Worker("./worker.ts");
    worker.addEventListener("message", (e) => {
      console.log(e.data);
    });
  };

  return <button onClick={runWorker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Run Web Worker</button>;
}