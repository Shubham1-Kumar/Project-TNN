"use client";

import { AppBar } from "./components/Appbar";
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession(); // NextAuth session
  const router = useRouter();

  const handleTryNowClick = () => {
    if (session) {
      // User is logged in
      router.push("/news");
    } else {
      // User is not logged in
      router.push("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <AppBar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-blue-100 to-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Get AI-Summarized News on the Go
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8">
          Stay informed effortlessly with <span className="font-semibold text-blue-600">NeuralNetwork</span> – the world’s first AI-powered news platform delivering concise, real-time global headlines and insights.
        </p>
        <button 
        onClick={handleTryNowClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg transition">
          Try It Now
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">🔍 Smart Summarization</h2>
            <p className="text-gray-600">
              News articles are distilled to the core facts using advanced neural networks and NLP models.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">🌍 Global Coverage</h2>
            <p className="text-gray-600">
              Get the latest on geopolitics, diplomacy, international affairs, and more—across the world.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">⚡ Lightning Fast</h2>
            <p className="text-gray-600">
              Our AI fetches, processes, and summarizes the news in real-time—no more long reads.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-200 text-sm text-gray-600">
        © {new Date().getFullYear()} NeuralNetwork — Built with 🧠 + ⚡ by Team TNN
      </footer>
    </div>
  );
}