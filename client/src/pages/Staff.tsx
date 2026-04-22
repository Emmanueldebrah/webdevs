import { trpc } from "@/lib/trpc";
import { Mail, Phone, Loader2 } from "lucide-react";

export default function Staff() {
  const { data: staff, isLoading } = trpc.staff.getPublished.useQuery();

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Staff Directory</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" size={40} /></div>
          ) : staff && staff.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {staff.map((member) => (
                <div key={member.id} className="card-elegant text-center">
                  {member.photoUrl && <img src={member.photoUrl} alt={member.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />}
                  <h3 className="font-serif font-bold text-lg">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{member.position}</p>
                  {member.department && <p className="text-muted-foreground text-sm mb-3">{member.department}</p>}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary mb-2">
                      <Mail size={16} /> {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                      <Phone size={16} /> {member.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No staff members listed yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
