import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE_URL = "https://minetech.lovable.app";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/sectors", priority: "0.7", changefreq: "monthly" },
  { path: "/services", priority: "0.7", changefreq: "monthly" },
  { path: "/projects", priority: "0.6", changefreq: "monthly" },
  { path: "/careers", priority: "0.9", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/investors", priority: "0.9", changefreq: "monthly" },
  { path: "/for-mining-companies", priority: "0.9", changefreq: "monthly" },
  { path: "/partners", priority: "0.8", changefreq: "monthly" },
];

Deno.serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: jobs } = await supabase
      .from("jobs")
      .select("slug, updated_at")
      .eq("is_published", true);

    const today = new Date().toISOString().split("T")[0];

    const urls = [
      ...STATIC_ROUTES.map(
        (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
      ),
      ...(jobs || []).map(
        (j: { slug: string; updated_at: string }) => `  <url>
    <loc>${SITE_URL}/careers/${j.slug}</loc>
    <lastmod>${j.updated_at.split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      ),
    ].join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return new Response(`Error: ${e instanceof Error ? e.message : String(e)}`, { status: 500 });
  }
});
