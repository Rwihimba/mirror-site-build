import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const stats = [
  { value: "127", label: "Countries" },
  { value: "135+", label: "Offices" },
  { value: "4,500+", label: "Global staff" },
  { value: "45+", label: "Technical services" },
];

const timeline = [
  { year: "1994", event: "SLR founded in the UK" },
  { year: "2000", event: "Expansion into Europe" },
  { year: "2010", event: "Asia-Pacific operations begin" },
  { year: "2015", event: "Americas expansion" },
  { year: "2020", event: "Global sustainability focus" },
  { year: "2024", event: "4,500+ colleagues worldwide" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Breadcrumb and Title */}
          <div className="container-slr flex flex-col justify-center py-16 lg:py-24">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>About Us</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight animate-slide-in-left">
              Global Leaders in<br />
              Sustainability Solutions
            </h1>
          </div>

          {/* Pattern/Image */}
          <div className="relative h-[40vh] lg:h-auto section-pattern">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-hero-foreground/10">
                <path d="M100 20 L180 100 L100 180 L20 100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M100 40 L160 100 L100 160 L40 100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
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
                SLR's purpose is Making Sustainability Happen.
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                At SLR, we are true sustainability consultants - combining deep expertise with practical delivery. Our team of scientists, engineers, economists, data modelers, and advisors work across our clients' full sustainability journeys, from strategy through to on-the-ground project planning, execution and ongoing operations, all supported by robust data and science-based modelling.
              </p>
            </div>
            <div>
              <img
                src="https://cdn.sanity.io/images/b0ecix6u/production/17f628ce520c9896cca250b1bdbc3c814bdb8772-1013x884.png?w=800"
                alt="Sustainability illustration"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://cdn.sanity.io/images/b0ecix6u/production/7becb29bf3fec2b1cf02b3e8fa49213796846cfb-786x580.png?w=800"
                alt="Approach illustration"
                className="rounded-lg"
              />
            </div>
            <div>
              <span className="text-primary font-body text-sm uppercase tracking-wider">Approach</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">
                We partner with clients to drive meaningful, lasting change.
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                Our reputation is built on honesty, technical excellence, and collaborative relationships that deliver real results.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
                We enable the sustainable flow of capital, energy, resources, information, and essential nutrients by helping our clients balance environmental, social, and economic business drivers.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2">
                <p className="italic text-foreground font-body mb-4">
                  "We founded the business in 1994. Since then, we have built 'One Team' of talented environmental and business consultants, engineers and scientists. We partner with clients throughout their project life-cycle from strategy and design, through compliance and operations, to end-of-life remediation."
                </p>
                <cite className="text-sm font-semibold font-body text-primary">Neil Penhall, Vice Chair</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-hero text-hero-foreground">
        <div className="container-slr">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://cdn.sanity.io/images/b0ecix6u/production/9e2a3863e788fe05dc6cd8bb9792e436a59bd91e-4096x2738.jpg?w=1400"
              alt="Team in nature"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-hero/60" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-16 relative z-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card text-card-foreground text-center p-8 rounded-lg shadow-lg">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">SLR Timeline</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-4 p-6 bg-card rounded-lg">
                <div className="text-3xl font-display font-bold text-primary">{item.year}</div>
                <div className="text-muted-foreground font-body">{item.event}</div>
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
            Get in touch for a collaborative discussion about what sustainability could look like for your organisation.
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
