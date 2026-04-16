import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const SITE_URL = "https://minetech.lovable.app";
const DEFAULT_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";

export function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
  noIndex = false,
}: SEOProps) {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname}`;
  const fullTitle = title.includes("MineTech") ? title : `${title} | MineTech`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MineTech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
