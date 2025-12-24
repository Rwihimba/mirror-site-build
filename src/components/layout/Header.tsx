import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('[data-section="light"]');
      const headerHeight = 56;
      
      let onLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          onLight = true;
        }
      });
      
      setIsOnLightSection(onLight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const textColor = isOnLightSection ? "text-primary" : "text-white";
  const hoverColor = isOnLightSection ? "hover:text-primary-dark" : "hover:text-primary-light";
  const bgColor = isOnLightSection ? "bg-background/80" : "bg-hero/80";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300 ${bgColor}`}>
      <div className="container-slr flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-base font-display font-semibold tracking-tight ${textColor} drop-shadow-sm transition-colors duration-300`}>MineTech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          <Link to="/" className={`text-xs font-body ${textColor} ${hoverColor} transition-colors duration-300`}>
            Home
          </Link>
          <Link to="/solutions" className={`text-xs font-body ${textColor} ${hoverColor} transition-colors duration-300`}>
            Solutions
          </Link>
          <Link to="/about" className={`text-xs font-body ${textColor} ${hoverColor} transition-colors duration-300`}>
            About
          </Link>
          <Link to="/careers" className={`text-xs font-body ${textColor} ${hoverColor} transition-colors duration-300`}>
            Career
          </Link>
          <Link to="/contact" className={`text-xs font-body ${textColor} ${hoverColor} transition-colors duration-300`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 ${textColor} transition-colors duration-300`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hero/95 backdrop-blur-sm border-t border-hero-foreground/10">
          <nav className="container-slr py-4 space-y-2">
            <Link to="/" className="block py-2 font-body text-[11px] text-white">Home</Link>
            <Link to="/solutions" className="block py-2 font-body text-[11px] text-white">Solutions</Link>
            <Link to="/about" className="block py-2 font-body text-[11px] text-white">About</Link>
            <Link to="/careers" className="block py-2 font-body text-[11px] text-white">Career</Link>
            <Link to="/contact" className="block py-2 font-body text-[11px] text-white">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
