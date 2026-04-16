import { ArrowUpRight, TrendingUp, Globe2, Cpu, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CALENDLY_URL } from "@/lib/intent/popupVariants";
import { trackCtaClick } from "@/lib/analytics";
import heroImage from "@/assets/contact-hero.webp";

const pillars = [
  { icon: Globe2, title: "$1.7T African Mining Market", body: "Africa holds 30% of global mineral reserves but lags in digital infrastructure — a generational opportunity." },
  { icon: Cpu, title: "AI-Native Platform", body: "Built from day one as an intelligent operations layer, not a legacy ERP retrofit." },
  { icon: ShieldCheck, title: "Mission-Critical Stickiness", body: "Once integrated into safety and grade control, MineTech becomes infrastructure — not a tool." },
  { icon: TrendingUp, title: "Repeatable Expansion", body: "Land with one mine, expand across operators, geographies and adjacent industrial verticals." },
];

const Investors = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Invest in MineTech",
    description: "Investment opportunity in MineTech — Africa's leading mining technology and AI-for-industrial-operations platform.",
    provider: {
      "@type": "Organization",
      name: "MineTech",
      url: "https://minetech.lovable.app",
    },
  };

  return (
    <Layout>
      <SEO
        title="Invest in Mining Technology | MineTech"
        description="Invest in MineTech — the AI-native intelligence platform powering the next generation of African mining. Book a 30-minute call with the founders."
        keywords="invest in mining tech, mining technology investment, African tech startups, AI for industrial operations, smart mining solutions, venture capital mining"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative bg-hero text-hero-foreground overflow-hidden min-h-[70vh] pt-16 flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-hero/70" />
        </div>
        <div className="container-slr relative z-10 py-20">
          <div className="text-xs text-primary-light font-body uppercase tracking-[0.2em] mb-4">For Investors</div>
          <h1 className="text-4xl md:text-6xl font-display leading-[1.1] mb-6 max-w-4xl">
            Invest in the future of mining technology
          </h1>
          <p className="text-lg md:text-xl text-hero-foreground/80 font-body max-w-2xl mb-10">
            MineTech is rebuilding mining operations on an intelligent, real-time foundation —
            starting in Africa, the most underpenetrated and resource-rich mining market in the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero-accent" size="lg" className="group">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCtaClick("book_a_call", { location: "investors_hero" })}>
                Book a 30-min Call
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
            <Button asChild variant="hero" size="lg">
              <a href="mailto:info@minetech.co.rw?subject=Investor%20Inquiry" onClick={() => trackCtaClick("email_team", { location: "investors_hero" })}>Email the Team</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4">Why MineTech, why now</h2>
            <p className="text-lg text-muted-foreground font-body">
              Mining is the backbone of the energy transition — and the most data-rich, least-digitized
              industry on earth. We're closing that gap with an AI-native operating system built by
              mining and software veterans.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card border border-border p-6 rounded-lg">
                <Icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-hero text-hero-foreground">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Let's talk</h2>
          <p className="text-lg text-hero-foreground/80 font-body mb-8 max-w-xl mx-auto">
            Book a 30-minute intro call with the founders. We'll share the deck, the roadmap, and the round.
          </p>
          <Button asChild variant="hero-accent" size="lg" className="group">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCtaClick("book_a_call", { location: "investors_footer_cta" })}>
              Book a Call
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Investors;
