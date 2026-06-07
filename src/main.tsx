import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { GA_ID } from "./lib/analytics";

// Inject GA4 gtag.js asynchronously when a measurement ID is configured.
if (GA_ID && typeof window !== "undefined") {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.gtag?.("config", GA_ID, { anonymize_ip: true, send_page_view: false });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Tell the prerenderer the app is ready. Fires after first paint,
// then once more after a short delay so per-route <Helmet> tags settle.
if (typeof window !== "undefined") {
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.dispatchEvent(new Event("render-event"));
    }, 1500);
  });
}
