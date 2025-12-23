import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground footer-pattern">
      <div className="container-minetech py-16 md:py-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Logo and Tagline */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-primary-light/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-light rounded-sm" />
              </div>
              <span className="text-2xl font-display font-semibold">MineTech</span>
            </div>
            <p className="text-sm font-body text-footer-foreground/70 leading-relaxed">
              Real-Time Mining Intelligence, Orchestrated. Transforming African mining through intelligent technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm font-body text-footer-foreground/60 hover:text-footer-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm font-body text-footer-foreground/60 hover:text-footer-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm font-body text-footer-foreground/60 hover:text-footer-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/solutions" className="text-sm font-body text-footer-foreground/60 hover:text-footer-foreground transition-colors">
                    All Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/use-cases" className="text-sm font-body text-footer-foreground/60 hover:text-footer-foreground transition-colors">
                    Use Cases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="p-2 rounded bg-footer-foreground/5 hover:bg-footer-foreground/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded bg-footer-foreground/5 hover:bg-footer-foreground/10 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded bg-footer-foreground/5 hover:bg-footer-foreground/10 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-footer-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs font-body text-footer-foreground/40">
            © 2024 MineTech. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-body">
            <Link to="/privacy" className="text-footer-foreground/40 hover:text-footer-foreground/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-footer-foreground/40 hover:text-footer-foreground/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
