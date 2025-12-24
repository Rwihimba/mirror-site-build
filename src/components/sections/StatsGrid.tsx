interface Stat {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
  variant?: "light" | "dark";
  className?: string;
}

export function StatsGrid({ stats, variant = "light", className = "" }: StatsGridProps) {
  if (variant === "dark") {
    return (
      <section className={`py-16 md:py-24 bg-hero text-hero-foreground ${className}`}>
        <div className="container-slr">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-hero-foreground/5 backdrop-blur text-center p-8 rounded-lg">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary-light mb-2">{stat.value}</div>
                <div className="text-sm text-hero-foreground/70 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-20 bg-background ${className}`}>
      <div className="container-slr">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card text-center p-8 rounded-lg border border-border">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}