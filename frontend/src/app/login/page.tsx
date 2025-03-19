"use client";

import { useState } from "react";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
  getCurrentUser,
} from "./auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(getCurrentUser());

  const handleGoogleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) setUser(loggedInUser);
  };

  const handleEmailLogin = async () => {
    const loggedInUser = await loginWithEmail(email, password);
    if (loggedInUser) setUser(loggedInUser);
  };

  const handleRegister = async () => {
    const registeredUser = await registerWithEmail(email, password);
    if (registeredUser) setUser(registeredUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>

          <div className="w-full max-w-xs space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full p-2 bg-green-500 text-white rounded"
              onClick={handleEmailLogin}
            >
              Login with Email
            </button>
            <button
              className="w-full p-2 bg-gray-500 text-white rounded"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
}
