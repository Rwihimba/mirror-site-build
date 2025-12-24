import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-hero text-hero-foreground sticky top-0 z-50">
      <div className="container-slr flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-display font-semibold tracking-tight">MineTech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-body hover:text-primary-light transition-colors">
            Home
          </Link>
          <Link to="/solutions" className="text-sm font-body hover:text-primary-light transition-colors">
            Solutions
          </Link>
          <Link to="/about" className="text-sm font-body hover:text-primary-light transition-colors">
            About
          </Link>
          <Link to="/careers" className="text-sm font-body hover:text-primary-light transition-colors">
            Career
          </Link>
          <Link to="/contact" className="text-sm font-body hover:text-primary-light transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-56 bg-transparent border border-hero-foreground/30 rounded px-4 py-1.5 text-sm text-hero-foreground placeholder:text-hero-foreground/50 focus:outline-none focus:border-hero-foreground/50 font-body"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hero-foreground/50" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hero border-t border-hero-foreground/10">
          <nav className="container-slr py-4 space-y-2">
            <Link to="/" className="block py-2 font-body text-sm">Home</Link>
            <Link to="/solutions" className="block py-2 font-body text-sm">Solutions</Link>
            <Link to="/about" className="block py-2 font-body text-sm">About</Link>
            <Link to="/careers" className="block py-2 font-body text-sm">Career</Link>
            <Link to="/contact" className="block py-2 font-body text-sm">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
