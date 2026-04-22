import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function News() {
  const { data: news, isLoading } = trpc.news.getPublished.useQuery();

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">News & Announcements</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" size={40} /></div>
          ) : news && news.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {news.map((article) => (
                <div key={article.id} className="card-elegant">
                  {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                  <h3 className="font-serif font-bold text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{new Date(article.createdAt).toLocaleDateString()}</p>
                  <p className="text-muted-foreground">{article.excerpt || article.content.substring(0, 200)}...</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No news articles yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
