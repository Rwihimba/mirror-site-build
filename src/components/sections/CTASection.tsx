import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: "light" | "dark";
  children?: ReactNode;
}

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "light",
  children,
}: CTASectionProps) {
  if (variant === "dark") {
    return (
      <section className="py-16 md:py-24 bg-hero text-hero-foreground section-pattern">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">{title}</h2>
          <p className="text-lg text-hero-foreground/80 font-body mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          {children || (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryAction && (
                <Button variant="hero-accent" className="group" asChild>
                  <Link to={primaryAction.href}>
                    {primaryAction.label}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              )}
              {secondaryAction && (
                <Button variant="hero" asChild>
                  <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-slr text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        {children || (
          primaryAction && (
            <Link 
              to={primaryAction.href} 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors"
            >
              {primaryAction.label}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )
        )}
      </div>
    </section>
  );
}