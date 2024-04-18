'use client';

import { useEffect, useRef } from "react";

export function WebWorker() {
  const worker  = useRef<Worker>();

  useEffect(() => {
    worker.current = new Worker("./worker.js");
    worker.current.addEventListener("message", (e: MessageEvent) => {
      console.log('Is profane:', e.data);
    });

    return () => {
      worker.current!.terminate();
    };
  }, []);

  const postMessage = () => {
    worker.current!.postMessage("Hello World!");
  }

  const postProfanity = () => {
    worker.current!.postMessage("Hello Mother Fuckers!");
  }

  return (<>
    <button onClick={postMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hello World!</button>
    <button onClick={postProfanity} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hello Mother Fuckers!</button>
  </>);
}

/*
self.onmessage = (e) => {
  checkProfanity(e.data);
}

const checkProfanity = (text) => {
  const url = new URL('https://www.purgomalum.com/service/containsprofanity');
  url.searchParams.append('text', text);

  fetch(url)
    .then(response => response.text())
    .then(data => {
      self.postMessage(data);
    });
};
 */