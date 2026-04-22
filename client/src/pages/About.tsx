import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About Ebenezer SHS
          </h1>
          <p className="text-lg text-white/90">
            Discover our rich history, mission, and commitment to excellence
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="section-title">Our History</h2>
          <div className="max-w-4xl">
            <p className="text-lg text-muted-foreground mb-6">
              Ebenezer Senior High School, fondly known as Padua, was founded on January 22, 1941, by the late Mr. Robert Teiko Aryee. Mr. Aryee was born on April 23, 1902, in Accra to Mr. Charles Ayi Aryee, a fisherman, and Naomi Quarcoo, a trader.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              In those early days, there was no reason to encourage schooling as the people had no role models or money to send their children to school. Mr. Robert Teiko Aryee decided to change all this by empowering his local community. He started a private night school in a small rented room in the Timber Market area on Charles Lane Street, Ayalolo, Accra, with just four (4) students.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              By 1947, four out of six students had written the Cambridge School Certificate Examination as private students. Mr. Aryee had help from pioneering teachers including Mr. E.K.A. Otoo, Joseph Tetteh Taye, Miss Joyce Quartey, Enoch Amui Amoo, Emmanuel Oblitey Amoo, E.M. Oku, Emmanuel Nii Addy, and Miss Margaret Ahulu.
            </p>
            <p className="text-lg text-muted-foreground">
              Over the decades, the school has grown from that humble beginning into a premier educational institution with over 2,500 students, 9,000+ alumni, and numerous accolades. Today, Ebenezer SHS stands as a testament to the vision and dedication of its founder and the unwavering commitment of its staff and community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card-elegant">
              <h3 className="text-2xl font-serif font-bold mb-4 text-primary">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground">
                To provide quality education that develops the intellectual, moral, physical, and social capabilities of our students, preparing them to become responsible citizens who contribute meaningfully to society.
              </p>
            </div>

            {/* Vision */}
            <div className="card-elegant">
              <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground">
                To produce happy, moral, and creative citizens through enlightened, disciplined, and broad education. We envision Ebenezer SHS as a beacon of academic excellence and character development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for the highest standards in all aspects of education and school life.",
              },
              {
                title: "Integrity",
                description:
                  "We uphold honesty, truthfulness, and moral principles in all our dealings.",
              },
              {
                title: "Discipline",
                description:
                  "We foster self-discipline and respect for authority and community norms.",
              },
              {
                title: "Inclusivity",
                description:
                  "We welcome and support students from diverse backgrounds and abilities.",
              },
              {
                title: "Innovation",
                description:
                  "We embrace modern teaching methods and technologies to enhance learning.",
              },
              {
                title: "Community",
                description:
                  "We believe in the power of community and collaborative growth.",
              },
            ].map((value) => (
              <div key={value.title} className="card-elegant text-center">
                <h3 className="font-serif font-bold text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            School Motto
          </h2>
          <p className="text-2xl font-serif mb-8">
            "Semper Pege" - Always Forward
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            This motto encapsulates our commitment to continuous progress, improvement, and moving forward in all endeavors. We encourage our students and staff to always strive for better, to never settle, and to always move forward with purpose and determination.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="section-title">Explore More</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/academics">
              <a>
                <Button className="btn-primary">
                  Our Programmes <ArrowRight className="ml-2" size={20} />
                </Button>
              </a>
            </Link>
            <Link href="/staff">
              <a>
                <Button className="btn-secondary">
                  Meet Our Team
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
