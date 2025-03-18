"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { login, logout } from "@/app/login/auth";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null); // 型を User | null に修正

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // ここで明示的に user をセット
    });

    return () => unsubscribe();
  }, []);

  return (
    <button onClick={user ? logout : login}>
      {user ? "Sign Out" : "Sign In"}
    </button>
  );
}
