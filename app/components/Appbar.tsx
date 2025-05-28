"use client";
import { useRouter } from "next/navigation";
import Image from "next/image"

export const AppBar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-md">
      <div className="flex items-center ml-4">
      <Image 
      src='/TNNLOGO.png'
      alt="NeuralNetwork logo"
      width={180}
      height={180}
      priority
      />
      </div>
      <div className="flex gap-5">
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="bg-blue-600 text-white px-4 py-2 mr-4 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
};
