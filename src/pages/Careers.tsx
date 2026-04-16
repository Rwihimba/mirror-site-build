import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PageHero, StatsGrid, CTASection } from "@/components/sections";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import careersWorker from "@/assets/careers-worker.png";

interface JobListItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string | null;
  location: string | null;
  employment_type: string | null;
}

const stats = [
  { value: "Rwanda", label: "Home Base" },
  { value: "Growing", label: "Team of Specialists" },
  { value: "Pan-African", label: "Expansion Vision" },
  { value: "15", label: "Departments Integrated" },
];

const benefits = [
  "Competitive compensation and equity opportunities",
  "Flexible and remote-friendly working arrangements",
  "Professional development in cutting-edge mining technology",
  "Pan-African growth and expansion opportunities",
  "Mission-driven culture focused on impact",
  "Ground-floor opportunity in Africa's mining digitization",
];

const categories = [
  "All Departments",
  "Core Technical",
  "Domain Expert",
  "Growth & Market",
];

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    category: "Core Technical",
    description: "Build and scale our integrated mining platform",
    requirements: ["Flutter, Python, cloud infrastructure", "Experience with real-time data systems preferred"],
  },
  {
    title: "Data Scientist - Mining Intelligence",
    category: "Core Technical",
    description: "Develop predictive models for grade control, safety monitoring",
    requirements: ["Mining domain knowledge a plus", "Experience with geospatial data"],
  },
  {
    title: "Mobile Application Developer",
    category: "Core Technical",
    description: "Build field-ready mobile solutions for mining operations",
    requirements: ["Flutter/React Native", "Offline-first architecture experience"],
  },
  {
    title: "Mining Operations Specialist",
    category: "Domain Expert",
    description: "Bridge technology and mining operations",
    requirements: ["Geology/Mining Engineering background", "Experience in African mining contexts"],
  },
  {
    title: "Compliance & Safety Systems Analyst",
    category: "Domain Expert",
    description: "Design digital compliance workflows aligned with Rwanda Mines Board",
    requirements: ["Mining safety certification preferred", "Regulatory knowledge essential"],
  },
  {
    title: "Business Development Manager - Mining Sector",
    category: "Growth & Market",
    description: "Drive partnerships with mining operations and cooperatives",
    requirements: ["Existing mining industry relationships valued", "Rwanda/East Africa market knowledge"],
  },
  {
    title: "Customer Success Engineer",
    category: "Growth & Market",
    description: "Lead platform implementation and training",
    requirements: ["Help operations transition from paper-based systems", "Technical + people skills"],
  },
  {
    title: "Implementation Specialist",
    category: "Growth & Market",
    description: "On-site deployment and training",
    requirements: ["Travel to mining sites across Rwanda", "Bilingual (English/Kinyarwanda) required"],
  },
];

const Careers = () => {
  const [activeCategory, setActiveCategory] = useState("All Departments");
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("jobs")
        .select("id, slug, title, category, short_description, location, employment_type")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (!cancelled) {
        setJobs((data as JobListItem[]) || []);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const categoriesFromData = Array.from(new Set(jobs.map((j) => j.category)));
  const categories = ["All Departments", ...categoriesFromData];

  const filteredJobs = activeCategory === "All Departments"
    ? jobs
    : jobs.filter((job) => job.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="Join the Mining Intelligence Revolution"
        breadcrumb="Careers"
        minHeight="sm"
        centered
      />

      <StatsGrid stats={stats} variant="light" />

      {/* Open Roles Section */}
      <section id="openings" className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            Open Roles<br />at MineTech
          </h2>
          
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="text-sm text-muted-foreground font-body">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm font-body uppercase tracking-wider transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-foreground border-border hover:border-primary"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="ml-2 w-1.5 h-1.5 bg-primary-foreground rounded-full inline-block" />
                )}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <p className="text-muted-foreground font-body">Loading roles…</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-muted-foreground font-body">No open roles in this category right now.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Link
                  to={`/careers/${job.slug}`}
                  key={job.id}
                  className="group bg-secondary rounded-lg p-8 flex flex-col hover:bg-secondary/70 transition-colors border border-transparent hover:border-primary/30"
                >
                  <div className="text-xs text-primary font-body uppercase tracking-wider mb-4">
                    {job.category}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {job.title}
                  </h3>
                  {job.short_description && (
                    <p className="text-muted-foreground font-body mb-4">
                      {job.short_description}
                    </p>
                  )}
                  <ul className="space-y-1 mb-6 flex-grow text-sm text-muted-foreground/80 font-body">
                    {job.location && <li>• {job.location}</li>}
                    {job.employment_type && <li>• {job.employment_type}</li>}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-body text-primary">
                    View Role
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* One Platform Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">One Platform Culture</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                MineTech's One Platform culture is the backbone of our organization. Our strength comes not only from our mining expertise and technical skills, but also from our ability to integrate across disciplines - from geology and safety to compliance and financial operations - creating seamless solutions.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                MineTech is committed to building an inclusive, collaborative environment where diverse perspectives drive innovation for the benefit of our team, our mining partners, and the communities we serve across Africa.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden flex items-center justify-center">
              <img src={careersWorker} alt="Mining professional in safety gear" className="max-w-[320px] w-full h-auto object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* DE&I Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-secondary rounded-lg p-12 flex items-center justify-center order-2 lg:order-1">
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-primary/20">
                <rect x="30" y="30" width="60" height="60" fill="currentColor" opacity="0.5" />
                <rect x="110" y="30" width="60" height="60" fill="currentColor" opacity="0.7" />
                <rect x="30" y="110" width="60" height="60" fill="currentColor" opacity="0.3" />
                <rect x="110" y="110" width="60" height="60" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-body text-sm uppercase tracking-wider">Diversity, Equity & Inclusion</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">Our DE&I Commitment</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                Our Diversity, Equity & Inclusion commitment supports our mission to democratize mining intelligence across Africa. It provides direction for building a workplace that respects and values our diverse team, ensuring we create solutions that serve the full spectrum of African mining operations - from artisanal cooperatives to mid-scale commercial mines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Why Join MineTech?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-6 bg-card rounded-lg border border-border">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-body">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Make Mining Intelligence Accessible?"
        description="Join our team of passionate mining professionals and technologists working on solutions that matter. Browse our current openings or get in touch to learn more about opportunities at MineTech."
        variant="dark"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero-accent" className="group" asChild>
            <a href="#openings">
              View Open Positions
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </CTASection>
    </Layout>
  );
};

export default Careers;