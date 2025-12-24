import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import miningPit from "@/assets/mining-pit.jpg";
import miningLoader from "@/assets/mining-loader.jpg";
import miningTunnel from "@/assets/mining-tunnel.jpg";

const solutions = [
  { 
    title: "Safety & Compliance Intelligence", 
    description: "Real-time safety monitoring and automated compliance reporting across all operations."
  },
  { 
    title: "Production & Fleet Optimization", 
    description: "Maximize equipment utilization and production efficiency with intelligent scheduling."
  },
  { 
    title: "Environmental Monitoring & Reporting", 
    description: "Continuous environmental data collection and automated regulatory reporting."
  },
  { 
    title: "Supply Chain & Logistics", 
    description: "End-to-end visibility and optimization of mining supply chain operations."
  },
  { 
    title: "Financial Operations & Payroll", 
    description: "Integrated financial management with automated payroll and cost tracking."
  },
  { 
    title: "Grade Control & Resource Management", 
    description: "Precise ore tracking and resource optimization from extraction to processing."
  },
  { 
    title: "Quality Control & Processing", 
    description: "Real-time quality monitoring and processing optimization systems."
  },
  { 
    title: "Sub-Contractor Management Systems", 
    description: "Unified contractor oversight with integrated compliance and performance tracking."
  },
];

const stats = [
  { value: "15+", label: "Mining Departments Covered" },
  { value: "156+", label: "Operation Workflows Implemented" },
  { value: "40+", label: "Years Combined Mining Experience" },
  { value: "10+", label: "Integrated Systems & Data Sources" },
];

const useCases = [
  {
    title: "Real-Time Grade Control Intelligence",
    description: "Grade control data flows instantly from geology to operations, preventing ore dilution and processing inefficiencies. Lab results automatically align with live mining locations and equipment assignments, enabling real-time extraction adjustments.",
    impacts: [
      "15–20% reduction in ore dilution",
      "Optimized stockpile management",
      "Full grade reconciliation from blast to mill"
    ]
  },
  {
    title: "Automated Compliance & License Management",
    description: "MineTech continuously aggregates operational data across departments and automatically generates regulatory reports.",
    impacts: [
      "80% reduction in compliance reporting time",
      "Zero missed submissions",
      "Continuous audit-ready documentation"
    ]
  },
  {
    title: "Integrated Workforce Intelligence",
    description: "MineTech unifies attendance, payroll, certifications, and equipment assignments into a single workforce intelligence layer.",
    impacts: [
      "30–40% reduction in HR admin time",
      "Optimized labor allocation",
      "Full RSSB compliance automation"
    ]
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-hero overflow-hidden min-h-[85vh] pt-16">
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
        
        <div className="relative flex flex-col lg:flex-row min-h-[85vh]">
          {/* Left - Text Content */}
          <div className="relative text-hero-foreground lg:w-[55%] flex flex-col justify-center px-8 md:px-12 lg:px-20 py-20 lg:py-32 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] mb-10 animate-slide-in-left">
              Every action at your mine triggers instant intelligence and real-time insights.
            </h1>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/invest">
                <Button variant="hero-accent" className="group">
                  Invest
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
              <Link to="/partner">
                <Button variant="hero-accent" className="group">
                  Partner
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
              <Link to="/deploy">
                <Button variant="hero-accent" className="group">
                  Deploy
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>

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

      {/* Post-Hero Section - Split Layout */}
      <section className="bg-secondary" data-section="light">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          <div className="py-16 md:py-24 pl-8 md:pl-12 lg:pl-20 pr-8 md:pr-12 lg:pr-12">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-6 font-body">
              Mining operations today run on dozens of systems—fleet management, safety monitoring, production tracking, compliance reporting. Each generates valuable data. But when these systems operate in silos, that data remains trapped, and critical insights slip through the cracks. The challenge isn't digitization anymore. It's orchestration.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80 mb-6 font-body">
              At MineTech, we connect your existing systems into a unified intelligence platform—transforming isolated data streams into synchronized, real-time insights that drive decisive action across your entire operation.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80 mb-6 font-body">
              Our promise? To turn your disconnected digital landscape into orchestrated intelligence, delivering visibility, control, and confidence at every level of your mine.
            </p>
            <p className="text-xl font-display font-semibold text-foreground">
              Real-Time Mining Intelligence, Orchestrated.
            </p>
          </div>
          <div className="h-full">
            <img
              src={miningLoader}
              alt="Mining loader operating in an open pit mine"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-background" data-section="light">
        <div className="container-slr">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4">End-to-End Mining Intelligence</h2>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              MineTech is a specialist in mining digitization, offering full orchestration—from integration strategy to real-time operational intelligence, covering every department and decision.
            </p>
            <Link to="/about" className="link-arrow text-primary font-medium mt-4 inline-flex font-body">
              Learn more about our approach
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="bg-card p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-display font-semibold mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working at MineTech */}
      <section className="relative py-16 md:py-24 bg-hero text-hero-foreground overflow-hidden">
        {/* Background animation - matching hero */}
        <div className="absolute inset-0 overflow-hidden">
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

        <div className="container-slr relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Working at MineTech</h2>
              <p className="text-lg text-hero-foreground/80 font-body mb-4">
                MineTech is building Africa's leading mining technology team by combining:
              </p>
              <ul className="text-lg text-hero-foreground/80 font-body mb-6 space-y-2">
                <li>• Mining professionals</li>
                <li>• Software engineers</li>
                <li>• Data scientists</li>
                <li>• Data engineers</li>
              </ul>
              <p className="text-lg text-hero-foreground/80 font-body mb-6">
                All united by one mission: Transform African mining through intelligent technology.
              </p>
              <Link to="/careers">
                <Button variant="hero-accent" className="group">
                  Careers at MineTech
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-hero-foreground/5 rounded-lg backdrop-blur">
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary-light mb-2">{stat.value}</div>
                  <div className="text-sm text-hero-foreground/70 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-background" data-section="light">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Use Cases</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <article key={index} className="group bg-card rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-display font-semibold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground font-body mb-6">{useCase.description}</p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Impact:</p>
                  <ul className="space-y-1">
                    {useCase.impacts.map((impact, i) => (
                      <li key={i} className="text-sm text-muted-foreground font-body flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/use-cases">
              <Button variant="outline" className="group">
                View other use cases
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
