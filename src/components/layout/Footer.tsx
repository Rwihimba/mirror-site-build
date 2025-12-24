import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";
import minetechLogo from "@/assets/minetech-logo.png";

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-hero text-hero-foreground overflow-hidden">
      {/* Background animation - matching hero */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary-light/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-light/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-light/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M20,30 Q50,50 80,40" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
          <path d="M10,60 Q40,40 70,55" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
          <path d="M30,80 Q55,50 85,70" stroke="hsl(var(--primary-light))" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      <div className="container-slr py-16 md:py-20 relative z-10">
        {/* Logo and tagline */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <img src={minetechLogo} alt="MineTech Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-display font-semibold">MineTech</span>
          </div>
          <p className="text-lg font-display">Real-Time Mining Intelligence, Orchestrated.</p>
        </div>

        {/* Company Links - Horizontal */}
        <div className="flex flex-wrap items-center gap-6 mb-12">
          {companyLinks.map((link) => (
            <Link 
              key={link.title} 
              to={link.href} 
              className="text-sm font-body opacity-80 hover:opacity-100 transition-opacity"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#" className="p-2 rounded-full bg-hero-foreground/10 hover:bg-hero-foreground/20 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-hero-foreground/10 hover:bg-hero-foreground/20 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hero-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
