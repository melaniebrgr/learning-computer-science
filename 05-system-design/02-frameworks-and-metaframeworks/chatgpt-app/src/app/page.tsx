import { Suspense } from "react";
import PreviousChats from "./PreviousChats";

export default function LandingRoute() {
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>
      <Suspense fallback={<div>Loading Previous Chats</div>}>
        <PreviousChats />
      </Suspense>
    </main>
  );
}