import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Academics() {
  const programmes = [
    { name: "General Science", subjects: ["Biology", "Chemistry", "Physics", "Mathematics"] },
    { name: "Visual Arts", subjects: ["Painting", "Sculpture", "Drawing", "Art History"] },
    { name: "Home Economics", subjects: ["Nutrition", "Cooking", "Housekeeping", "Personal Finance"] },
    { name: "Business", subjects: ["Accounting", "Business Management", "Economics", "Marketing"] },
    { name: "Agriculture Science", subjects: ["Crop Production", "Animal Husbandry", "Horticulture", "Food Science"] },
    { name: "General Arts", subjects: ["Literature", "Government", "Geography", "French"] },
  ];

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Academic Programmes</h1>
          <p className="text-lg text-white/90">Six pathways to excellence</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {programmes.map((prog) => (
              <div key={prog.name} className="card-elegant">
                <h3 className="text-2xl font-serif font-bold mb-4 text-primary">{prog.name}</h3>
                <ul className="space-y-2">
                  {prog.subjects.map((subject) => (
                    <li key={subject} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-muted-foreground">{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
