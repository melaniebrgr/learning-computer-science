'use client';

export function WebWorker() {
  const runWorker = () => {
    const worker = new Worker("./worker.js");
    worker.addEventListener("message", (e: MessageEvent) => {
      console.log(e.data);
    });
  }

  return <button onClick={runWorker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Run Web Worker</button>;
}