import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("campus-life");
  const { data: gallery, isLoading } = trpc.gallery.getByCategory.useQuery(selectedCategory);

  const categories = ["campus-life", "events", "extracurricular"];

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Photo Gallery</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedCategory === cat ? "btn-primary" : "btn-outline"}`}>
                {cat.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" size={40} /></div>
          ) : gallery && gallery.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {gallery.map((img) => (
                <div key={img.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-64 object-cover hover:scale-105 transition-transform" />
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold mb-1">{img.title}</h3>
                    {img.description && <p className="text-sm text-muted-foreground">{img.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No images in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
