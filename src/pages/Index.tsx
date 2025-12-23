import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Leaf, Truck, DollarSign, Layers, FlaskConical, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ParticleBackground } from "@/components/ParticleBackground";

const solutions = [
  {
    icon: Shield,
    title: "Safety & Compliance Intelligence",
    description: "Real-time safety monitoring and automated compliance reporting across all operations.",
  },
  {
    icon: Zap,
    title: "Production & Fleet Optimization",
    description: "Maximize equipment utilization and production output with intelligent scheduling.",
  },
  {
    icon: Leaf,
    title: "Environmental Monitoring & Reporting",
    description: "Continuous environmental data collection and automated regulatory submissions.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description: "End-to-end visibility and optimization of materials flow and logistics.",
  },
  {
    icon: DollarSign,
    title: "Financial Operations & Payroll",
    description: "Integrated financial management with automated payroll and cost tracking.",
  },
  {
    icon: Layers,
    title: "Grade Control & Resource Management",
    description: "Precision ore tracking from blast to mill with real-time grade reconciliation.",
  },
  {
    icon: FlaskConical,
    title: "Quality Control & Processing",
    description: "Automated quality assurance and processing optimization.",
  },
  {
    icon: Users,
    title: "Sub-Contractor Management Systems",
    description: "Unified contractor oversight with performance tracking and compliance.",
  },
];

const stats = [
  { value: "15+", label: "Mining Departments Covered" },
  { value: "690+", label: "Mining Concessions in Rwanda" },
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
      "Full grade reconciliation from blast to mill",
    ],
  },
  {
    title: "Automated Compliance & License Management",
    description: "MineTech continuously aggregates operational data across departments and automatically generates regulatory reports.",
    impacts: [
      "80% reduction in compliance reporting time",
      "Zero missed submissions",
      "Continuous audit-ready documentation",
    ],
  },
  {
    title: "Integrated Workforce Intelligence",
    description: "MineTech unifies attendance, payroll, certifications, and equipment assignments into a single workforce intelligence layer.",
    impacts: [
      "30–40% reduction in HR admin time",
      "Optimized labor allocation",
      "Full RSSB compliance automation",
    ],
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-hero overflow-hidden min-h-[90vh] flex items-center">
        {/* Particle Animation Background */}
        <ParticleBackground />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 data-flow-pattern opacity-30" />
        
        <div className="container-minetech relative z-10 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-hero-foreground leading-[1.15] mb-8 animate-fade-in">
              Every action at your mine triggers instant intelligence and real-time insights.
            </h1>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/invest">
                <Button 
                  className="min-w-[140px] bg-transparent border border-hero-foreground/40 text-hero-foreground hover:bg-hero-foreground hover:text-hero font-body px-8 py-2.5"
                >
                  Invest
                </Button>
              </Link>
              <Link to="/partner">
                <Button 
                  className="min-w-[140px] bg-transparent border border-hero-foreground/40 text-hero-foreground hover:bg-hero-foreground hover:text-hero font-body px-8 py-2.5"
                >
                  Partner
                </Button>
              </Link>
              <Link to="/deploy">
                <Button 
                  className="min-w-[140px] bg-transparent border border-hero-foreground/40 text-hero-foreground hover:bg-hero-foreground hover:text-hero font-body px-8 py-2.5"
                >
                  Deploy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Hero Section - Split Layout */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container-minetech">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text */}
            <div className="order-2 lg:order-1">
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-6 font-body">
                Mining operations today run on dozens of systems—fleet management, safety monitoring, production tracking, compliance reporting. Each generates valuable data. But when these systems operate in silos, that data remains trapped, and critical insights slip through the cracks. The challenge isn't digitization anymore. It's orchestration.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mb-6 font-body">
                At MineTech, we connect your existing systems into a unified intelligence platform—transforming isolated data streams into synchronized, real-time insights that drive decisive action across your entire operation.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mb-8 font-body">
                Our promise? To turn your disconnected digital landscape into orchestrated intelligence, delivering visibility, control, and confidence at every level of your mine.
              </p>
              <p className="text-2xl md:text-3xl font-display font-medium text-foreground">
                Real-Time Mining Intelligence, Orchestrated.
              </p>
            </div>
            
            {/* Right - Square Image */}
            <div className="order-1 lg:order-2">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&h=800&fit=crop"
                  alt="Abstract mining operations with data overlay"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container-minetech">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              End-to-End Mining Intelligence
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-4">
              MineTech is a specialist in mining digitization, offering full orchestration—from integration strategy to real-time operational intelligence, covering every department and decision.
            </p>
            <Link 
              to="/about" 
              className="link-arrow text-primary-light font-medium font-body text-sm"
            >
              Learn more about our approach
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <div 
                key={solution.title} 
                className="p-6 bg-card border border-border hover:border-primary-light/30 transition-colors"
              >
                <solution.icon className="w-8 h-8 text-primary-light mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-display font-medium mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers / Company Section */}
      <section className="py-20 md:py-32 bg-hero text-hero-foreground">
        <div className="container-minetech">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                Working at MineTech
              </h2>
              <p className="text-lg text-hero-foreground/80 font-body mb-8 leading-relaxed">
                MineTech is building Africa's leading mining technology team by combining mining professionals, software engineers, and data scientists—all united by one mission: transform African mining through intelligent technology.
              </p>
              <Link to="/careers">
                <Button 
                  variant="outline" 
                  className="border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground font-body group"
                >
                  Careers at MineTech
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="p-6 border border-hero-foreground/10"
                >
                  <div className="text-4xl md:text-5xl font-display font-semibold text-primary-light mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-hero-foreground/60 font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container-minetech">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-16">
            Use Cases
          </h2>
          
          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <div 
                key={useCase.title} 
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-10 bg-card border border-border"
              >
                <div>
                  <span className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3 block">
                    Use Case {index + 1}
                  </span>
                  <h3 className="text-2xl font-display font-medium mb-4">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-4 block">
                    Impact
                  </span>
                  <ul className="space-y-3">
                    {useCase.impacts.map((impact) => (
                      <li 
                        key={impact} 
                        className="flex items-start gap-3 text-foreground font-body"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-light mt-2 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/use-cases">
              <Button 
                variant="outline" 
                className="font-body group"
              >
                View other use cases
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
