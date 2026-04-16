import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
  imageAlt?: string;
  minHeight?: "sm" | "md" | "lg";
  centered?: boolean;
  children?: ReactNode;
}

const ParticlesBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-hero" />
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary-light/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M20,30 Q50,50 80,40" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
      <path d="M10,60 Q40,40 70,55" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
      <path d="M30,80 Q55,50 85,70" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
    </svg>
  </div>
);

const DecorativeLine = () => (
  <div className="absolute bottom-16 left-8 right-0 hidden lg:block">
    <svg viewBox="0 0 100 15" preserveAspectRatio="none" className="w-full h-16">
      <line x1="0" y1="100%" x2="70" y2="100%" stroke="hsl(var(--hero-foreground) / 0.2)" strokeWidth="0.2" />
      <line x1="70" y1="100%" x2="85" y2="20%" stroke="hsl(var(--hero-foreground) / 0.2)" strokeWidth="0.2" />
    </svg>
  </div>
);

const heightClasses = {
  sm: "min-h-[50vh]",
  md: "min-h-[70vh]",
  lg: "min-h-[85vh]",
};

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  image,
  imageAlt = "",
  minHeight = "md",
  centered = false,
  children,
}: PageHeroProps) {
  const hasImage = !!image;

  if (centered) {
    return (
      <section className={`relative bg-hero overflow-hidden ${heightClasses[minHeight]} pt-16`}>
        <ParticlesBackground />
        <div className={`relative flex flex-col ${heightClasses[minHeight]}`}>
          <div className="relative text-hero-foreground flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-20 py-20 lg:py-32 z-10">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>{breadcrumb}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] mb-6 animate-slide-in-left max-w-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-hero-foreground/80 font-body max-w-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative bg-hero overflow-hidden ${heightClasses[minHeight]} pt-16`}>
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" loading="eager" fetchPriority="high" / decoding="async">
          <div className="absolute inset-0 bg-hero/60" />
        </div>
      ) : (
        <ParticlesBackground />
      )}
      
      <div className={`relative flex flex-col lg:flex-row ${heightClasses[minHeight]}`}>
        <div className={`relative text-hero-foreground ${hasImage ? 'lg:w-[65%]' : 'lg:w-[55%]'} flex flex-col justify-center px-8 md:px-12 lg:px-20 py-20 lg:py-32 z-10`}>
          <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span>›</span>
            <span>{breadcrumb}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] mb-6 animate-slide-in-left">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {subtitle}
            </p>
          )}
          {children}
          <DecorativeLine />
        </div>

        {!image && imageAlt && (
          <div 
            className="relative lg:absolute lg:right-0 lg:top-0 lg:w-[48%] h-[50vh] lg:h-[calc(100%-3rem)] lg:mt-8 lg:mr-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)" }}
          >
            <img src={imageAlt} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" / decoding="async">
            <div className="absolute bottom-0 right-0 w-2/3 h-1/3 section-pattern opacity-40" />
          </div>
        )}
      </div>
    </section>
  );
}