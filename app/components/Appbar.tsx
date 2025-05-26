"use client";
import { useRouter } from "next/navigation";

export const AppBar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <span className="font-bold text-lg">TNN</span>
      <div className="flex gap-5">
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
};
