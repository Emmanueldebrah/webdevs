import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Admissions() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredProgramme: "General Science",
    message: "",
  });

  const createInquiry = trpc.admission.create.useMutation({
    onSuccess: () => {
      toast.success("Inquiry submitted successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", preferredProgramme: "General Science", message: "" });
    },
    onError: () => {
      toast.error("Failed to submit inquiry");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry.mutate(formData);
  };

  return (
    <div className="min-h-screen">
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Admissions</h1>
          <p className="text-lg text-white/90">Join our community of excellence</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Admission Process</h2>
              <ol className="space-y-4">
                {["Submit your inquiry form", "Attend entrance examination", "Receive interview invitation", "Complete registration", "Begin your journey"].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">{i + 1}</div>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-elegant">
              <h3 className="text-2xl font-serif font-bold mb-6">New Admission Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                  <Input placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                </div>
                <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <Input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <select value={formData.preferredProgramme} onChange={(e) => setFormData({...formData, preferredProgramme: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg">
                  <option>General Science</option>
                  <option>Visual Arts</option>
                  <option>Home Economics</option>
                  <option>Business</option>
                  <option>Agriculture Science</option>
                  <option>General Arts</option>
                </select>
                <Textarea placeholder="Message (optional)" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                <Button type="submit" className="btn-primary w-full" disabled={createInquiry.isPending}>
                  {createInquiry.isPending ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
