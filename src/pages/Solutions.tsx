import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { PageHero, UseCaseCard, CTASection } from "@/components/sections";
import solutionsHero from "@/assets/solutions-hero.jpg";

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

const Solutions = () => {
  return (
    <Layout>
      <PageHero
        title="End-to-End Mining Intelligence"
        subtitle="MineTech offers full orchestration—from integration strategy to real-time operational intelligence, covering every department and decision."
        breadcrumb="Solutions"
        minHeight="md"
        imageAlt={solutionsHero}
      />

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

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Use Cases</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} />
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

      <CTASection
        title="Ready to Transform Your Mining Operations?"
        description="Our team of mining technology experts can help you develop a customized intelligence platform that meets your specific operational needs."
        primaryAction={{ label: "Get in Touch", href: "/contact" }}
      />
    </Layout>
  );
};

export default Solutions;