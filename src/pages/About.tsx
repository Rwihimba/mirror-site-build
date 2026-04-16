import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero, StatsGrid, CTASection } from "@/components/sections";
import { SEO } from "@/components/SEO";

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
      <PageHero
        title="African Leaders in Mining Digitization"
        subtitle="Making Mining Intelligence Accessible"
        breadcrumb="About Us"
        minHeight="sm"
        centered
      />

      {/* Purpose Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-body text-sm uppercase tracking-wider">Purpose</span>
            <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">
              Making Mining Intelligence Accessible
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              At MineTech, we are true mining technology specialists - combining deep industry expertise with practical digital solutions. Our team of geologists, engineers, data scientists, and mining operations advisors work across our clients' full digitization journeys, from strategy through to on-the-ground deployment, training, and ongoing optimization, all supported by real-time data and intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="max-w-4xl mx-auto">
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
      </section>

      <StatsGrid stats={stats} variant="dark" />

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

      <CTASection
        title="Want to learn more?"
        description="Get in touch for a collaborative discussion about how MineTech can transform your mining operations."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
};

export default About;