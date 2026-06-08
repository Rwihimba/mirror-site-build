import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections";
import osHeroAsset from "@/assets/minetech-os-hero.png.asset.json";
import corpImg from "@/assets/product-corp.jpg";
import traceImg from "@/assets/product-trace.jpg";
import upstreamImg from "@/assets/product-upstream.jpg";

const PRODUCTS = [
  {
    slug: "os",
    name: "Minetech OS",
    category: "Operating system for mid and large scale mines",
    outcome: "One source of truth across geology, fleet, safety, finance and compliance.",
    image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "corp",
    name: "Minetech Corp",
    category: "Shared infrastructure for cooperatives and ASM",
    outcome: "Formalise production, payment and reporting across hundreds of small operators.",
    image: corpImg,
  },
  {
    slug: "trace",
    name: "Minetech Trace",
    category: "Chain of custody and due diligence",
    outcome: "Buyer-ready provenance from the pit to the port.",
    image: traceImg,
  },
  {
    slug: "upstream",
    name: "Minetech Upstream",
    category: "Counterparty and licence screening",
    outcome: "Know who you are dealing with before the deal is signed.",
    image: upstreamImg,
  },
];

export default function Products() {
  return (
    <Layout>
      <SEO
        title="Products | MineTech"
        description="The MineTech product suite: one operating record, four products that plug into mining, cooperatives, trade and screening."
      />
      <PageHero
        title="One record. Four products."
        subtitle="Each product pulls value from the same operating record. Plug in where it makes sense for you."
        breadcrumb="Products"
        minHeight="md"
        imageAlt="https://images.pexels.com/photos/32529341/pexels-photo-32529341.jpeg"
      />

      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr">
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group bg-card p-8 flex flex-col hover:bg-secondary transition-colors"
              >
                <div className="aspect-square w-full overflow-hidden mb-6 bg-secondary">
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body mb-3">
                  {p.category}
                </span>
                <h2 className="text-2xl font-display font-semibold mb-3">{p.name}</h2>
                <p className="text-muted-foreground font-body leading-relaxed flex-1">
                  {p.outcome}
                </p>
                <span className="mt-6 text-sm font-body text-primary group-hover:underline">
                  Explore {p.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}