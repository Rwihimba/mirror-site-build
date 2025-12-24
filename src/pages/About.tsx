import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import miningTunnel from "@/assets/mining-tunnel.jpg";
import miningLoader from "@/assets/mining-loader.jpg";

const stats = [
  { value: "15+", label: "Operational Departments Covered" },
  { value: "80%", label: "African Mines Still Paper-Based" },
  { value: "5-75x", label: "More Affordable Than Enterprise" },
  { value: "40+", label: "Years Combined Experience" },
];

const team = [
  {
    name: "Mining Operations Lead",
    role: "Operations & Strategy",
    description: "Deep expertise in open pit and underground mining operations across Africa."
  },
  {
    name: "Chief Technology Officer",
    role: "Technology & Data",
    description: "Leading digital transformation with scalable, robust mining technology solutions."
  },
  {
    name: "Head of Data Science",
    role: "Analytics & Intelligence",
    description: "Turning operational data into actionable insights for real-time decision making."
  },
  {
    name: "Geology & Resource Lead",
    role: "Grade Control & Resources",
    description: "Ensuring precise ore tracking and resource optimization from extraction to processing."
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section - Matching Homepage Design */}
      <section className="relative bg-hero overflow-hidden min-h-[70vh] pt-16">
        {/* Background animation - abstract data particles */}
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
        
        <div className="relative flex flex-col lg:flex-row min-h-[70vh]">
          {/* Left - Text Content */}
          <div className="relative text-hero-foreground lg:w-[55%] flex flex-col justify-center px-8 md:px-12 lg:px-20 py-20 lg:py-32 z-10">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>About Us</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] mb-6 animate-slide-in-left">
              African Leaders in Mining Digitization
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Making Mining Intelligence Accessible
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
              alt="Underground mining tunnel"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-2/3 h-1/3 section-pattern opacity-40" />
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-body text-sm uppercase tracking-wider">Purpose</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">
                Making Mining Intelligence Accessible
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                At MineTech, we are true mining technology specialists - combining deep industry expertise with practical digital solutions. Our team of geologists, engineers, data scientists, and mining operations advisors work across our clients' full digitization journeys, from strategy through to on-the-ground deployment, training, and ongoing optimization, all supported by real-time data and intelligent automation.
              </p>
            </div>
            <div>
              <img
                src={miningLoader}
                alt="Mining operations"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={miningTunnel}
                alt="Mining tunnel operations"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-body text-sm uppercase tracking-wider">Approach</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">
                We partner with mining operations to drive operational excellence and sustainable growth.
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                Our reputation is built on affordability, technical robustness, and collaborative partnerships that deliver measurable results.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
                We enable efficient mining operations by helping our clients transition from paper-based systems to integrated digital platforms that balance safety, compliance, productivity, and profitability.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2">
                <p className="italic text-foreground font-body mb-4">
                  "We recognized that 80% of African mining operations still rely on paper-based systems, creating gaps in safety, compliance, and operational efficiency. Since founding MineTech, we've built an integrated platform covering 15 operational departments - from exploration and grade control to safety monitoring and financial operations. We partner with mining operations throughout their lifecycle, providing solutions that are 5-75 times more affordable than enterprise alternatives."
                </p>
                <cite className="text-sm font-semibold font-body text-primary">MineTech Founders</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-hero text-hero-foreground">
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

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="mb-12">
            <span className="text-primary font-body text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-display mt-2 mb-4">
              Building Africa's Leading Mining Technology Team
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              MineTech combines mining professionals, software engineers, data scientists, and data engineers - all united by one mission: Transform African mining through intelligent technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-card p-8 rounded-lg hover:shadow-lg transition-shadow border border-border">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-body mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground font-body">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Want to learn more?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Get in touch for a collaborative discussion about how MineTech can transform your mining operations.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors">
            Contact Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;