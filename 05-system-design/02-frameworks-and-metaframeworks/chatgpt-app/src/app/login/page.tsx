import { LoginForm } from "./LoginForm";

export default function LoginRoute() {
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Login to access ChatGPT app</h1>
      <LoginForm />
    </main>
  );
}
