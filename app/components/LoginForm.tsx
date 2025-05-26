// app/(dashboard)/login/LoginForm.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import googleLogo from "@/public/g.webp";

type Provider = {
  id: string;
  name: string;
};

type Providers = Record<string, Provider>;

export default function LoginForm({
  providers,
}: {
  providers: Providers | null;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/news");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <div>
            <label className="block text-lg font-sm text-gray-800">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block text-black w-full border border-gray-400 px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-sm text-gray-800">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="aeindf2Ksdfh"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full text-black border border-gray-400 px-3 py-2 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-800 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </div>

        {providers && (
          <div className="mt-6 text-center">
            {Object.values(providers).map((provider: Provider) => {
              if (provider.id === "credentials") return null;
              return (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="mt-4 flex items-center justify-center gap-3 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
                >
                  {provider.id === "google" && (
                    <Image
                      src={googleLogo}
                      alt="Google logo"
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    Sign in with {provider.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
