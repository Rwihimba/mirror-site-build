import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "135+", label: "Office Locations" },
  { value: "4,500+", label: "Global Colleagues" },
  { value: "6", label: "Operating Regions" },
  { value: "45+", label: "Technical Disciplines" },
];

const benefits = [
  "Competitive compensation and benefits",
  "Flexible working arrangements",
  "Professional development opportunities",
  "Global mobility programs",
  "Inclusive workplace culture",
  "Meaningful sustainability work",
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[50vh]">
          {/* Breadcrumb and Title */}
          <div className="container-slr flex flex-col justify-center py-16 lg:py-20">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>Careers</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 animate-slide-in-left">
              Careers at SLR
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl">
              We don't have all the answers to the complex sustainability challenges faced by humanity today. But we're working on it. When you join SLR, you'll work alongside some of the world's leading advisors and technicians on projects of global importance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-hero-foreground/10 backdrop-blur p-6 rounded-lg text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary-light mb-2">{stat.value}</div>
                  <div className="text-sm text-hero-foreground/70 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One Team Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">One Team Culture</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                SLR's One Team culture is the backbone of our organisation. Our strength not only comes from our skills and experience, but also from our ability to collaborate across disciplines and regions - supporting each other on a global basis.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                SLR is committed to creating and sustaining a global, inclusive culture, where differences are embraced for the benefit of our people, our clients and the communities around us.
              </p>
            </div>
            <div>
              <img
                src="https://cdn.sanity.io/images/b0ecix6u/production/2669c53a60f2f74fea2dca3cbf8dbc988b343264-1212x532.png?w=800"
                alt="One Team culture"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DE&I Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://cdn.sanity.io/images/b0ecix6u/production/15208f5f7c27236db12fe06eecf592f01f51648c-1212x532.png?w=800"
                alt="DE&I at SLR"
                className="rounded-lg"
              />
            </div>
            <div>
              <span className="text-primary font-body text-sm uppercase tracking-wider">Diversity, Equity & Inclusion</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">Our DE&I Strategy</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                Our Diversity, Equity & Inclusion strategy will help us achieve our organisational and people goals, supporting our future strategic direction and growth, and our One Team culture. It provides a shared direction and commitment for the organisation so we can work together to respect and value our diverse workforce and continue to build a more inclusive workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Why Join SLR?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-body">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-hero text-hero-foreground section-pattern">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Ready to Make Sustainability Happen?</h2>
          <p className="text-lg text-hero-foreground/80 font-body mb-8 max-w-2xl mx-auto">
            Join our team of passionate professionals working on projects that matter. Browse our current openings or get in touch to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero-accent" className="group" asChild>
              <a href="#openings">
                View Open Positions
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/contact">Contact HR</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
