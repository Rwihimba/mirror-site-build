import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Public marketing routes that should ship real HTML for crawlers
// (admin + dynamic detail pages stay client-rendered).
const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/services",
  "/sectors",
  "/projects",
  "/careers",
  "/contact",
  "/solutions",
  "/investors",
  "/for-mining-companies",
  "/partners",
  "/content-hub",
  "/insights",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-jsdom",
        rendererOptions: {
          // wait for react-helmet to mutate <head>
          renderAfterTime: 1500,
        },
        postProcess(rendered: { route: string; html: string }) {
          // Strip dev-only attributes if any leak through
          rendered.html = rendered.html.replace(
            /<script[^>]+data-lov-id[^>]*>[\s\S]*?<\/script>/g,
            ""
          );
          return rendered;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["@supabase/supabase-js", "react", "react-dom"],
  },
}));
