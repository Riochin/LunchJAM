// LunchJAM/frontend/components/AuthButton.tsx
"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { logout } from "@/app/login/auth";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    if (user) {
      await logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {user && (
        <span className="text-sm text-gray-600 hidden md:block">
          {user.email?.split("@")[0]}
        </span>
      )}
      <button
        onClick={handleClick}
        className={`
          px-3 py-2
          rounded-md
          text-sm
          font-medium
          transition-colors
          duration-200
          ${
            user
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        {user ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}
