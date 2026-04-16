import { useState } from "react";
import { ArrowUpRight, Activity, ShieldAlert, Gauge, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit } from "@/lib/analytics";
import heroImage from "@/assets/contact-hero.webp";

const benefits = [
  { icon: ShieldAlert, title: "Industrial Safety Technology", body: "Real-time hazard detection, automated incident workflows and full RSSB compliance." },
  { icon: Gauge, title: "Production Optimization", body: "Live fleet utilization, grade control reconciliation and stockpile intelligence." },
  { icon: Activity, title: "Smart Mining Solutions", body: "AI-driven forecasting, anomaly detection and predictive maintenance across your fleet." },
  { icon: Layers, title: "One Unified Layer", body: "Connect ERP, fleet management, IoT sensors and lab systems into a single source of truth." },
];

const ForMiningCompanies = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("form_submissions").insert({
      form_type: "demo_request",
      data: form,
    });
    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    } else {
      trackFormSubmit("demo_request");
      toast({ title: "Demo requested", description: "We'll be in touch within one business day." });
      setForm({ name: "", email: "", company: "", message: "" });
    }
    setSubmitting(false);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MineTech for Mining Companies",
    serviceType: "Mining digitization and operational intelligence",
    provider: { "@type": "Organization", name: "MineTech" },
    areaServed: "Africa",
    description:
      "Industrial safety technology and smart mining solutions for African mining operators — real-time intelligence across safety, fleet, grade control and compliance.",
  };

  return (
    <Layout>
      <SEO
        title="Smart Mining Solutions for Operators | MineTech"
        description="Industrial safety technology and AI-driven smart mining solutions for African operators. Optimize safety, fleet and compliance with real-time mining intelligence."
        keywords="smart mining solutions, industrial safety technology, mining technology, mining digitization, AI for industrial operations, mine fleet management"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative bg-hero text-hero-foreground overflow-hidden min-h-[70vh] pt-16 flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-hero/70" />
        </div>
        <div className="container-slr relative z-10 py-20">
          <div className="text-xs text-primary-light font-body uppercase tracking-[0.2em] mb-4">For Mining Operators</div>
          <h1 className="text-4xl md:text-6xl font-display leading-[1.1] mb-6 max-w-4xl">
            Optimize safety and productivity in your operations
          </h1>
          <p className="text-lg md:text-xl text-hero-foreground/80 font-body max-w-2xl mb-10">
            One real-time intelligence layer connecting safety, fleet, compliance and grade control —
            built specifically for African mining operations.
          </p>
          <Button asChild variant="hero-accent" size="lg" className="group">
            <a href="#demo">
              Request a Demo
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12 max-w-3xl">
            Built for the operational realities of modern mines
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card border border-border p-6 rounded-lg">
                <Icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo form */}
      <section id="demo" className="py-16 md:py-24 bg-secondary scroll-mt-24">
        <div className="container-slr max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Request a Demo</h2>
          <p className="text-muted-foreground font-body mb-8">
            Tell us about your operation. We'll prepare a tailored walkthrough and respond within one business day.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input required type="email" placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input required placeholder="Company / mine site" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Textarea placeholder="What would you like to see in the demo?" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto group">
              {submitting ? "Sending…" : "Request Demo"}
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ForMiningCompanies;
