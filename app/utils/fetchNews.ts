
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
}

export async function fetchNews(): Promise<Article[]> {
  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q="geopolitics"+OR+"international+relations"+OR+"foreign+policy"+OR+"diplomacy"+OR+"global+affairs"&lang=en&max=20&topic=world&apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);

    if(!res.ok) {
      console.error('NewsApi failed with status:', res.status);
      return [];
    }
    const data = await res.json();
    console.log("✅ Raw response from NewsAPI:", data); 

    if(! data.articles || !Array.isArray(data.articles)) {
      console.error('Invalid response from NewsAPI:',data);
      return [];
    }

    return data.articles;
  } catch (error) {
    console.error("error fetching news: ", error)
    return [];
  }  
}
