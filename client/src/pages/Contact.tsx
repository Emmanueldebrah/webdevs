import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const createMessage = trpc.contact.create.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage.mutate(formData);
  };

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">Dansoman, Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+233302986227" className="text-muted-foreground hover:text-primary">+233 30 298 6227</a>
                    <br />
                    <a href="tel:+233559651014" className="text-muted-foreground hover:text-primary">+233 55 965 1014</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@ebenezer-shs.edu.gh" className="text-muted-foreground hover:text-primary">info@ebenezer-shs.edu.gh</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elegant">
              <h3 className="text-2xl font-serif font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <Input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <Input placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <Input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
                <Textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                <Button type="submit" className="btn-primary w-full" disabled={createMessage.isPending}>
                  {createMessage.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
