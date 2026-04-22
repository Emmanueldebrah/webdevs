import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: news } = trpc.news.getPublished.useQuery();
  const { data: events } = trpc.events.getPublished.useQuery();

  const stats = [
    { number: "2,578+", label: "Students" },
    { number: "9,000+", label: "Alumni" },
    { number: "100+", label: "Awards" },
    { number: "80+", label: "Years" },
  ];

  const programmes = [
    { name: "General Science", icon: "🔬" },
    { name: "Visual Arts", icon: "🎨" },
    { name: "Home Economics", icon: "🏠" },
    { name: "Business", icon: "💼" },
    { name: "Agriculture Science", icon: "🌾" },
    { name: "General Arts", icon: "📚" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Ebenezer Senior High School
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Excellence in Education Since 1941 • Dansoman, Accra
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admissions">
                <a>
                  <Button className="btn-primary w-full sm:w-auto">
                    Apply Now <ArrowRight className="ml-2" size={20} />
                  </Button>
                </a>
              </Link>
              <Link href="/about">
                <a>
                  <Button className="btn-outline w-full sm:w-auto text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">
            Founded in 1941 by Robert Teiko Aryee
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                Ebenezer Senior High School, fondly known as Padua, was founded in 1941 by the late Mr. Robert Teiko Aryee. What began as a night school with just four students has grown into one of Ghana's premier educational institutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our mission is to produce happy, moral, and creative citizens through enlightened, disciplined, and broad education. We remain committed to academic excellence, character development, and the holistic growth of our students.
              </p>
              <Link href="/about">
                <a>
                  <Button className="btn-primary">
                    Read Full History <ArrowRight className="ml-2" size={20} />
                  </Button>
                </a>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-muted-foreground">
                  85 Years of Educational Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="section-title">Our Programmes</h2>
          <p className="section-subtitle">
            Six diverse academic pathways for student success
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {programmes.map((prog) => (
              <div key={prog.name} className="card-elegant text-center">
                <div className="text-5xl mb-4">{prog.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{prog.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive curriculum designed for student excellence
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/academics">
              <a>
                <Button className="btn-secondary">
                  Explore All Programmes
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {news && news.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="section-title">Latest News</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {news.slice(0, 2).map((article) => (
                <div key={article.id} className="card-elegant">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-serif font-bold text-xl mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt || article.content.substring(0, 150)}...
                  </p>
                  <Link href="/news">
                    <a className="text-primary font-semibold hover:text-primary/80">
                      Read More →
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Join Ebenezer?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Start your journey to academic excellence and personal growth with us.
          </p>
          <Link href="/admissions">
            <a>
              <Button className="btn-primary">
                Begin Your Application
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
