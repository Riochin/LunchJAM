import { login } from "./auth";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Sign in with Google</button>
    </div>
  );
}
