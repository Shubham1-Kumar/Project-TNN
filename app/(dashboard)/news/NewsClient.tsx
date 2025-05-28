// 📄 app/news/NewsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchNews } from "@/app/utils/fetchNews";
import NewsCard from "@/app/components/NewsCard";
import Spinner from "@/app/components/Spinner";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
}

export default function NewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const news = await fetchNews();

      if (!news || news.length === 0) {
        console.log("No news data found.");
        setLoading(false);
        return;
      }
      setArticles(news.slice(0, 10));

      for (const article of news.slice(0, 10)) {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          content: article.content || article.description,
          }),
        });
        const data = await res.json();
        setSummaries((prev) => ({ ...prev, [article.url]: data.summary }));
      }

      setLoading(false);
    }
    loadNews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI-Powered News Summarizer</h1>
      {loading ? (
        <Spinner />
        
      ) : ( 
        articles.map((article) => (
          <NewsCard
            key={article.url}
            title={article.title}
            url={article.url}
            image={article.urlToImage}
            content={ summaries[article.url] || article.description || article.content}
          />
        ))
      )}
    </div>
  );
}
