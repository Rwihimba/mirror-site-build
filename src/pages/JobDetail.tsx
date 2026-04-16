import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Briefcase, MapPin, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { DynamicApplicationForm, type FormFieldDef } from "@/components/forms/DynamicApplicationForm";
import jobHero from "@/assets/job-detail-hero.webp";

type DescriptionBlock = { heading: string; body: string };

interface JobRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  short_description: string | null;
  description: DescriptionBlock[];
  form_schema: FormFieldDef[];
}

const JobDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<JobRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);
  const applyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("jobs")
        .select("id, slug, title, category, department, location, employment_type, short_description, description, form_schema")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (!cancelled) {
        setJob(data as JobRow | null);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const handleApplyClick = () => {
    setShowApply(true);
    import("@/lib/analytics").then(({ track }) =>
      track("job_apply_click", { category: "engagement", job_id: job?.id || "", job_title: job?.title || "" })
    );
    setTimeout(() => applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-slr py-32 text-center text-muted-foreground font-body">Loading role…</div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="container-slr py-32 text-center">
          <h1 className="text-3xl font-display mb-4">Role not found</h1>
          <p className="text-muted-foreground font-body mb-6">This role may have closed or moved.</p>
          <Button asChild><Link to="/careers">Back to Careers</Link></Button>
        </div>
      </Layout>
    );
  }

  const meta = [
    job.location && { icon: MapPin, label: job.location },
    job.department && { icon: Building2, label: job.department },
    job.employment_type && { icon: Briefcase, label: job.employment_type },
  ].filter(Boolean) as { icon: typeof MapPin; label: string }[];

  const descriptionText = (job.description || []).map((b) => `${b.heading}\n${b.body}`).join("\n\n");
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: descriptionText || job.short_description || job.title,
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: job.employment_type || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "MineTech",
      sameAs: "https://minetech.lovable.app",
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "RW" },
        }
      : undefined,
    industry: job.category,
    directApply: true,
  };

  return (
    <Layout>
      <SEO
        title={`${job.title} | MineTech Careers`}
        description={job.short_description || `Apply for the ${job.title} role at MineTech — Africa's leading mining technology startup.`}
        keywords={`${job.title}, ${job.category}, mining tech jobs Africa, MineTech careers`}
        type="article"
        jsonLd={jobPostingSchema}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <img
          src={jobHero}
          alt="Mining operations at night"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
        <div className="container-slr relative pt-32 pb-20 md:pt-40 md:pb-28">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-background/70 hover:text-background text-sm font-body uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Open Roles
          </Link>
          <div className="text-xs text-primary font-body uppercase tracking-[0.2em] mb-4">
            {job.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-background max-w-4xl leading-tight">
            {job.title}
          </h1>
          {job.short_description && (
            <p className="mt-6 text-lg md:text-xl text-background/80 font-body max-w-2xl">
              {job.short_description}
            </p>
          )}

          {meta.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {meta.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background/20 bg-background/5 backdrop-blur-sm text-background/90 text-sm font-body"
                >
                  <Icon className="w-4 h-4" /> {label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Button variant="hero-accent" size="lg" onClick={handleApplyClick} className="group">
              Apply for this Role
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {(job.description || []).map((block, i) => (
                <div key={i}>
                  <h2 className="text-2xl md:text-3xl font-display mb-4">{block.heading}</h2>
                  <p className="text-muted-foreground font-body leading-relaxed whitespace-pre-line">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-secondary border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-body uppercase tracking-wider text-muted-foreground">Role at a glance</h3>
                <dl className="space-y-3">
                  {job.department && (
                    <div>
                      <dt className="text-xs text-muted-foreground font-body uppercase tracking-wider">Department</dt>
                      <dd className="font-body text-foreground mt-1">{job.department}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt className="text-xs text-muted-foreground font-body uppercase tracking-wider">Location</dt>
                      <dd className="font-body text-foreground mt-1">{job.location}</dd>
                    </div>
                  )}
                  {job.employment_type && (
                    <div>
                      <dt className="text-xs text-muted-foreground font-body uppercase tracking-wider">Type</dt>
                      <dd className="font-body text-foreground mt-1">{job.employment_type}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-muted-foreground font-body uppercase tracking-wider">Category</dt>
                    <dd className="font-body text-foreground mt-1">{job.category}</dd>
                  </div>
                </dl>
                <Button onClick={handleApplyClick} className="w-full font-body group">
                  Apply Now
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Application form (inline) */}
      <section ref={applyRef} className="py-16 md:py-24 bg-secondary scroll-mt-24">
        <div className="container-slr max-w-3xl">
          {showApply ? (
            <DynamicApplicationForm jobId={job.id} jobTitle={job.title} schema={job.form_schema || []} />
          ) : (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display mb-4">Ready to join us?</h2>
              <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
                Click below and submit your application directly on this page — no popups, no detours.
              </p>
              <Button variant="hero-accent" size="lg" onClick={handleApplyClick} className="group">
                Start Application
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JobDetail;
