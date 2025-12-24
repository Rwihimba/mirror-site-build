import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import miningTunnel from "@/assets/mining-tunnel.jpg";

const solutions = [
  { 
    title: "Safety & Compliance Intelligence", 
    href: "/solutions/safety-compliance",
    description: "Real-time safety monitoring and automated compliance reporting across all operations."
  },
  { 
    title: "Production & Fleet Optimization", 
    href: "/solutions/production-fleet",
    description: "Maximize equipment utilization and production efficiency with intelligent scheduling."
  },
  { 
    title: "Environmental Monitoring & Reporting", 
    href: "/solutions/environmental",
    description: "Continuous environmental data collection and automated regulatory reporting."
  },
  { 
    title: "Supply Chain & Logistics", 
    href: "/solutions/supply-chain",
    description: "End-to-end visibility and optimization of mining supply chain operations."
  },
  { 
    title: "Financial Operations & Payroll", 
    href: "/solutions/financial-operations",
    description: "Integrated financial management with automated payroll and cost tracking."
  },
  { 
    title: "Grade Control & Resource Management", 
    href: "/solutions/grade-control",
    description: "Precise ore tracking and resource optimization from extraction to processing."
  },
  { 
    title: "Quality Control & Processing", 
    href: "/solutions/quality-control",
    description: "Real-time quality monitoring and processing optimization systems."
  },
  { 
    title: "Sub-Contractor Management Systems", 
    href: "/solutions/subcontractor-management",
    description: "Unified contractor oversight with integrated compliance and performance tracking."
  },
];

const Solutions = () => {
  return (
    <Layout>
      {/* Hero Section - Matching Homepage Design */}
      <section className="relative bg-hero overflow-hidden min-h-[70vh] pt-16">
        {/* Background animation - abstract data particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-hero" />
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary-light/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          {/* Subtle connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20,30 Q50,50 80,40" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
            <path d="M10,60 Q40,40 70,55" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
            <path d="M30,80 Q55,50 85,70" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
          </svg>
        </div>
        
        <div className="relative flex flex-col lg:flex-row min-h-[70vh]">
          {/* Left - Text Content */}
          <div className="relative text-hero-foreground lg:w-[55%] flex flex-col justify-center px-8 md:px-12 lg:px-20 py-20 lg:py-32 z-10">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>Solutions</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] mb-6 animate-slide-in-left">
              End-to-End Mining Intelligence
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              MineTech offers full orchestration—from integration strategy to real-time operational intelligence, covering every department and decision.
            </p>

            {/* Decorative diagonal line */}
            <div className="absolute bottom-16 left-8 right-0 hidden lg:block">
              <svg viewBox="0 0 100 15" preserveAspectRatio="none" className="w-full h-16">
                <line x1="0" y1="100%" x2="70" y2="100%" stroke="hsl(var(--hero-foreground) / 0.2)" strokeWidth="0.2" />
                <line x1="70" y1="100%" x2="85" y2="20%" stroke="hsl(var(--hero-foreground) / 0.2)" strokeWidth="0.2" />
              </svg>
            </div>
          </div>

          {/* Right - Hero Image with clipped bottom-left corner */}
          <div 
            className="relative lg:absolute lg:right-0 lg:top-0 lg:w-[48%] h-[50vh] lg:h-[calc(100%-3rem)] lg:mt-8 lg:mr-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)" }}
          >
            <img
              src={miningTunnel}
              alt="Underground mining tunnel with railway tracks"
              className="w-full h-full object-cover"
            />
            {/* Pattern Overlay on bottom right */}
            <div className="absolute bottom-0 right-0 w-2/3 h-1/3 section-pattern opacity-40" />
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Our Mining Intelligence Solutions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.title}
                to={solution.href}
                className="group p-8 min-h-[220px] bg-card rounded-lg hover:shadow-lg transition-shadow border border-border flex flex-col"
              >
                <h3 className="text-lg font-display font-semibold mb-3 group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                  <span>{solution.title}</span>
                  <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-sm text-muted-foreground font-body flex-grow">{solution.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Ready to Transform Your Mining Operations?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Our team of mining technology experts can help you develop a customized intelligence platform that meets your specific operational needs.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors">
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;