import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  solutions: [
    { title: "Safety & Compliance Intelligence", href: "/solutions/safety-compliance" },
    { title: "Production & Fleet Optimization", href: "/solutions/production-fleet" },
    { title: "Environmental Monitoring", href: "/solutions/environmental" },
    { title: "Supply Chain & Logistics", href: "/solutions/supply-chain" },
    { title: "Grade Control & Resource Management", href: "/solutions/grade-control" },
  ],
  useCases: [
    { title: "Real-Time Grade Control", href: "/use-cases/grade-control" },
    { title: "Automated Compliance", href: "/use-cases/compliance" },
    { title: "Workforce Intelligence", href: "/use-cases/workforce" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
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
            <span className="text-2xl font-display font-semibold">MineTech</span>
          </div>
          <p className="text-lg font-display">Real-Time Mining Intelligence, Orchestrated.</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
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
            <h4 className="font-display font-semibold mb-4">Use Cases</h4>
            <ul className="space-y-2">
              {footerLinks.useCases.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-footer-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm font-body opacity-60">© 2024 MineTech. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm font-body">
            <Link to="/privacy" className="opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="opacity-60 hover:opacity-100 transition-opacity">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
