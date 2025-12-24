import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-transparent text-hero-foreground fixed top-0 left-0 right-0 z-50">
      <div className="container-slr flex items-center justify-between h-12 md:h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-lg font-display font-semibold tracking-tight text-white drop-shadow-sm">MineTech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-xs font-body text-white hover:text-primary-light transition-colors">
            Home
          </Link>
          <Link to="/solutions" className="text-xs font-body text-white hover:text-primary-light transition-colors">
            Solutions
          </Link>
          <Link to="/about" className="text-xs font-body text-white hover:text-primary-light transition-colors">
            About
          </Link>
          <Link to="/careers" className="text-xs font-body text-white hover:text-primary-light transition-colors">
            Career
          </Link>
          <Link to="/contact" className="text-xs font-body text-white hover:text-primary-light transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hero/95 backdrop-blur-sm border-t border-hero-foreground/10">
          <nav className="container-slr py-4 space-y-2">
            <Link to="/" className="block py-2 font-body text-xs text-white">Home</Link>
            <Link to="/solutions" className="block py-2 font-body text-xs text-white">Solutions</Link>
            <Link to="/about" className="block py-2 font-body text-xs text-white">About</Link>
            <Link to="/careers" className="block py-2 font-body text-xs text-white">Career</Link>
            <Link to="/contact" className="block py-2 font-body text-xs text-white">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
