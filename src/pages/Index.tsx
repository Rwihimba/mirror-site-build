import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const projects = [
  {
    id: 1,
    title: "Climate physical and transition risk assessment for Tronox",
    client: "Tronox",
    sector: "Mining",
    region: "Global",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/ae3f8370a68fd9c400341ca9b72f609c7a00c606-3004x1997.jpg?w=600",
  },
  {
    id: 2,
    title: "V20 Group funding programme for climate change adaptation",
    client: "UNIDO",
    sector: "Government & Communities",
    region: "Global",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/b01e368b7ec919a448948544869e4c4f2978a8bf-768x427.png?w=600",
  },
  {
    id: 3,
    title: "Energy management, decarbonisation and circularity for the chemicals sector",
    client: "Anonymous",
    sector: "Energy",
    region: "International",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/03e6f967abb7a9abeecbe7a8bb00e38569104208-4288x2848.jpg?w=600",
  },
];

const solutions = [
  { title: "Climate Resilience & Net Zero", href: "/solutions/climate-resilience" },
  { title: "Energy Transition", href: "/solutions/energy-transition" },
  { title: "Nature, Natural Capital & Biodiversity", href: "/solutions/nature-biodiversity" },
  { title: "Responsible Sourcing", href: "/solutions/responsible-sourcing" },
  { title: "Social & Community Impact", href: "/solutions/social-impact" },
  { title: "Sustainable Finance", href: "/solutions/sustainable-finance" },
  { title: "Waste & Circularity", href: "/solutions/waste-circularity" },
];

const sectors = [
  { title: "Energy", href: "/sectors/energy" },
  { title: "Mining", href: "/sectors/mining" },
  { title: "Finance", href: "/sectors/finance" },
  { title: "Industry & Technology", href: "/sectors/industry" },
  { title: "Government & Infrastructure", href: "/sectors/government" },
  { title: "Built Environment", href: "/sectors/built-environment" },
];

const services = [
  { title: "Advisory", href: "/services/advisory" },
  { title: "Planning & Assessment", href: "/services/planning" },
  { title: "Engineering & Design", href: "/services/engineering" },
  { title: "Environmental & Earth Sciences", href: "/services/environmental" },
];

const stats = [
  { value: "135+", label: "Office Locations" },
  { value: "4,500+", label: "Global Colleagues" },
  { value: "127", label: "Countries" },
  { value: "45+", label: "Technical Disciplines" },
];

const insights = [
  {
    title: "Challenges to reach net zero data centres",
    authors: "Sharon Abram, Jonny Clark, Peter Lo",
    date: "04 December 2025",
    readTime: "8 minutes read",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/ab3dc0beb1bbf30a7e619755bf189bccafbe5ff2-1000x425.png?w=400",
  },
  {
    title: "Developing an inventory of US hydrogen emissions",
    authors: "Patrick Dilsaver, Kenny Malmquist",
    date: "02 December 2025",
    readTime: "5 minutes read",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/a8814492cd2dc967ba17ec5fc7a83140c28ee80e-4127x2413.jpg?w=400",
  },
  {
    title: "Transforming the Food & Beverage industry: From compliance only to business-driven decarbonisation",
    authors: "Vincenzo Giordano, Joseph Payne, Stéphane Rapoport",
    date: "01 December 2025",
    readTime: "6 minutes read",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/eb708da92fb21a285dd6fe484af98ddb2a1258e5-1000x425.png?w=400",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          {/* Left - Text Content */}
          <div className="container-slr flex flex-col justify-center py-16 lg:py-24 relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 animate-slide-in-left">
              Making<br />
              Sustainability<br />
              <span className="inline-flex items-center gap-4">
                <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16 text-primary-light">
                  <circle cx="20" cy="8" r="4" fill="currentColor" />
                  <circle cx="8" cy="20" r="4" fill="currentColor" />
                  <circle cx="32" cy="20" r="4" fill="currentColor" />
                  <circle cx="20" cy="32" r="4" fill="currentColor" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <circle cx="28" cy="12" r="3" fill="currentColor" />
                  <circle cx="12" cy="28" r="3" fill="currentColor" />
                  <circle cx="28" cy="28" r="3" fill="currentColor" />
                </svg>
                Happen.
              </span>
            </h1>
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/about/mission">
                <Button variant="hero-accent" className="group">
                  Our Mission
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative h-[50vh] lg:h-auto">
            <img
              src="https://cdn.sanity.io/images/b0ecix6u/production/33db98553b79dd20d98499680c1a144136bfe16e-2000x1333.jpg?w=1200"
              alt="Wind turbines in a sustainable landscape"
              className="w-full h-full object-cover"
            />
            {/* Pattern Overlay */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 section-pattern opacity-50" />
          </div>
        </div>
        
        {/* Decorative diagonal line */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
      </section>

      {/* Latest Projects */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Latest Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article key={project.id} className="group card-hover bg-card rounded-lg overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-card">
                    <span className="bg-card/20 backdrop-blur px-3 py-1 rounded text-sm font-body">Project</span>
                    <span className="text-sm font-body flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.region}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2 font-body">
                    <span>{project.client}</span>
                    <span>{project.sector}</span>
                  </div>
                  <h3 className="text-lg font-display font-medium mb-4 line-clamp-2">{project.title}</h3>
                  <div className="border-t border-border pt-4">
                    <Link to={`/projects/${project.id}`} className="link-arrow text-sm font-medium text-primary font-body">
                      Read more
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="outline" className="group">
                View all projects
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://cdn.sanity.io/images/b0ecix6u/production/34137ed3c6b453b7861b2ca425a3f231da98b12a-1040x594.png?w=800"
                alt="Sustainability illustration"
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-6 font-body">
                Sustainability is no longer discretionary. It has shifted to a core business consideration across operations, culture, strategy and markets. Balancing priorities amid complexity, and within the landscape of a volatile and uncertain world, is harder than ever.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mb-6 font-body">
                At SLR, we help clients act with confidence through Rational Sustainability - an evidence-based approach that moves beyond box-ticking to focus on what truly delivers long-term value.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 font-body">
                Our promise? To guide bold choices and deliver meaningful results, through real-world action that ensures we're Making Sustainability Happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Spectrum Solutions */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4">Full-Spectrum Solutions</h2>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              We are specialists in our field, able to offer clients full-spectrum sustainability strategy through to project delivery support. This enables us to help clients tackle the greatest sustainability challenges they face today.
            </p>
            <Link to="/about" className="link-arrow text-primary font-medium mt-4 inline-flex font-body">
              Learn more about our process
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solutions Column */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-2xl font-display font-semibold mb-6">Solutions</h3>
              <ul className="space-y-3">
                {solutions.map((item) => (
                  <li key={item.title}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-body">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/solutions" className="link-arrow text-primary font-medium mt-6 inline-flex font-body">
                View Solutions
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sectors Column */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-2xl font-display font-semibold mb-6">Sectors</h3>
              <ul className="space-y-3">
                {sectors.map((item) => (
                  <li key={item.title}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-body">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/sectors" className="link-arrow text-primary font-medium mt-6 inline-flex font-body">
                View Sectors
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Services Column */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-2xl font-display font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.title}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-body">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="link-arrow text-primary font-medium mt-6 inline-flex font-body">
                View Services
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working at SLR */}
      <section className="py-16 md:py-24 bg-hero text-hero-foreground section-pattern">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Working at SLR</h2>
              <p className="text-lg text-hero-foreground/80 font-body mb-6">
                SLR is committed to creating and sustaining a global, inclusive culture, where differences are embraced for the benefit of our people, our clients and the communities around us.
              </p>
              <Link to="/careers">
                <Button variant="hero-accent" className="group">
                  Careers at SLR
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

          {/* One Team Section */}
          <div className="bg-hero-foreground/5 rounded-lg p-8 md:p-12 backdrop-blur">
            <h3 className="text-2xl font-display font-semibold mb-4">One Team</h3>
            <p className="text-lg text-hero-foreground/80 font-body max-w-3xl">
              SLR's One Team culture is the backbone of our organisation. Our strength not only comes from our skills and experience, but also from our ability to collaborate across disciplines and regions - supporting each other on a global basis.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Thinking */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Latest Thinking</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <article key={index} className="group card-hover bg-card rounded-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-card px-3 py-1 rounded text-sm font-body">Insight</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-body">
                    <span>{insight.date}</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <h3 className="text-lg font-display font-medium mb-3 line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4">by {insight.authors}</p>
                  <div className="border-t border-border pt-4">
                    <Link to="/insights" className="link-arrow text-sm font-medium text-primary font-body">
                      View post
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/content-hub">
              <Button variant="outline" className="group">
                View all articles
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
