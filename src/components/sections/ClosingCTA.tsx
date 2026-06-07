import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";

export function ClosingCTA({ source = "home" }: { source?: string }) {
  return (
    <section className="py-20 md:py-28 bg-hero text-hero-foreground">
      <div className="container-slr text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
          Talk to us.
        </h2>
        <p className="text-lg text-hero-foreground/80 font-body mb-10">
          Tell us where you sit in the value chain. We will show you the record
          you would be working from on day one.
        </p>
        <Link
          to="/contact"
          onClick={() => trackCtaClick("closing_cta", { source })}
        >
          <Button variant="hero-accent" size="lg" className="group">
            Start the conversation
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}