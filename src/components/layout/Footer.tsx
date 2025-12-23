import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  solutions: [
    { title: "Climate Resilience & Net Zero", href: "/solutions/climate-resilience" },
    { title: "Energy Transition", href: "/solutions/energy-transition" },
    { title: "Nature & Biodiversity", href: "/solutions/nature-biodiversity" },
    { title: "Responsible Sourcing", href: "/solutions/responsible-sourcing" },
    { title: "Social & Community Impact", href: "/solutions/social-impact" },
  ],
  sectors: [
    { title: "Built Environment", href: "/sectors/built-environment" },
    { title: "Energy", href: "/sectors/energy" },
    { title: "Finance", href: "/sectors/finance" },
    { title: "Mining", href: "/sectors/mining" },
    { title: "Government & Infrastructure", href: "/sectors/government" },
  ],
  services: [
    { title: "Advisory", href: "/services/advisory" },
    { title: "Planning & Assessment", href: "/services/planning" },
    { title: "Engineering & Design", href: "/services/engineering" },
    { title: "Environmental Sciences", href: "/services/environmental" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
    { title: "Projects", href: "/projects" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground footer-pattern">
      <div className="container-slr py-16 md:py-20">
        {/* Logo and tagline */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-primary-light">
              <circle cx="20" cy="8" r="4" fill="currentColor" />
              <circle cx="8" cy="20" r="4" fill="currentColor" />
              <circle cx="32" cy="20" r="4" fill="currentColor" />
              <circle cx="20" cy="32" r="4" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="28" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="28" r="3" fill="currentColor" />
              <circle cx="28" cy="28" r="3" fill="currentColor" />
            </svg>
            <span className="text-2xl font-display font-semibold">SLR</span>
          </div>
          <p className="text-lg font-display">Making Sustainability Happen</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-display font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm font-body opacity-80 hover:opacity-100 transition-opacity">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Sectors</h4>
            <ul className="space-y-2">
              {footerLinks.sectors.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm font-body opacity-80 hover:opacity-100 transition-opacity">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm font-body opacity-80 hover:opacity-100 transition-opacity">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm font-body opacity-80 hover:opacity-100 transition-opacity">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#" className="p-2 rounded-full bg-footer-foreground/10 hover:bg-footer-foreground/20 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-footer-foreground/10 hover:bg-footer-foreground/20 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-footer-foreground/10 hover:bg-footer-foreground/20 transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-footer-foreground/10 hover:bg-footer-foreground/20 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-footer-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm font-body opacity-60">© 2024 SLR Consulting. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm font-body">
            <Link to="/privacy" className="opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="opacity-60 hover:opacity-100 transition-opacity">Terms of Use</Link>
            <Link to="/cookies" className="opacity-60 hover:opacity-100 transition-opacity">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
