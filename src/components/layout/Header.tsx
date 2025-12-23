import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-hero text-hero-foreground sticky top-0 z-50 border-b border-hero-foreground/10">
      <div className="container-minetech flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-primary-light/20 flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-light rounded-sm" />
          </div>
          <span className="text-xl md:text-2xl font-display font-semibold tracking-tight">
            MineTech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link 
            to="/solutions" 
            className="text-sm font-body text-hero-foreground/80 hover:text-hero-foreground transition-colors"
          >
            Solutions
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-body text-hero-foreground/80 hover:text-hero-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            to="/careers" 
            className="text-sm font-body text-hero-foreground/80 hover:text-hero-foreground transition-colors"
          >
            Career
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-body text-hero-foreground/80 hover:text-hero-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hero border-t border-hero-foreground/10">
          <nav className="container-minetech py-6 space-y-4">
            <Link 
              to="/solutions" 
              className="block py-2 font-body text-sm text-hero-foreground/80 hover:text-hero-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link 
              to="/about" 
              className="block py-2 font-body text-sm text-hero-foreground/80 hover:text-hero-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/careers" 
              className="block py-2 font-body text-sm text-hero-foreground/80 hover:text-hero-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Career
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 font-body text-sm text-hero-foreground/80 hover:text-hero-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
