// components/NewsCard.tsx

"use client";
import { useEffect, useState } from "react";
import Image from 'next/image' 
import Spinner from "@/app/components/Spinner";

interface NewsCardProps {
  title: string;
  image: string;
  url: string;
  content: string; // raw article content (used for summarization)
}

export default function NewsCard({
  title,
  url,
  image,
  content,
}: NewsCardProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });

        const data = await res.json();
        if (res.ok) {
          setSummary(data.summary);
        } else {
          setError("Failed to generate summary.");
          console.error("Summary error:", data.error);
        }
      } catch (err) {
        setError("Request failed.");
        console.error("Request error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [content]);

  return (
    <div className="border-b-2 rounded-xl p-4 m-4 shadow-lg border-gray-100 bg-zinc-800">
      {image && (
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
            <Image
            src="/TNNLOGO.png"
            alt={image}
            width={600}
            height={300}
            objectFit="cover"
            className="rounded-md"
            onError={(e) => {
              // Note: onError does not work with next/image for external URLs
              console.warn("Image load error:", image , e);
            }}
          />
          </div>
      )}
      <h2 className="text-xl font-medium text-white">{title}</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600 mt-2">{error}</p>
      ) : (
        <p className="text-gray-400 mt-2">{summary}</p>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 mt-2 block"
      >
        Read full article
      </a>
    </div>
  );
}
