import { trpc } from "@/lib/trpc";
import { Calendar, MapPin, Loader2 } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = trpc.events.getPublished.useQuery();

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Events Calendar</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" size={40} /></div>
          ) : events && events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="card-elegant">
                  <div className="flex gap-4">
                    {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-32 h-32 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-xl mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={16} />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground">{event.description?.substring(0, 150)}...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No upcoming events.</p>
          )}
        </div>
      </section>
    </div>
  );
}
