import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const solutions = [
  { title: "Climate Resilience & Net Zero", href: "/solutions/climate-resilience" },
  { title: "Energy Transition", href: "/solutions/energy-transition" },
  { title: "Nature & Biodiversity", href: "/solutions/nature-biodiversity" },
  { title: "Responsible Sourcing", href: "/solutions/responsible-sourcing" },
  { title: "Social & Community Impact", href: "/solutions/social-impact" },
  { title: "Sustainable Finance", href: "/solutions/sustainable-finance" },
];

const sectors = [
  { title: "Built Environment", href: "/sectors/built-environment" },
  { title: "Energy", href: "/sectors/energy" },
  { title: "Finance", href: "/sectors/finance" },
  { title: "Mining", href: "/sectors/mining" },
  { title: "Government & Infrastructure", href: "/sectors/government" },
  { title: "Industry & Technology", href: "/sectors/industry" },
];

const services = [
  { title: "Advisory", href: "/services/advisory" },
  { title: "Planning & Assessment", href: "/services/planning" },
  { title: "Engineering & Design", href: "/services/engineering" },
  { title: "Environmental Sciences", href: "/services/environmental" },
];

const aboutItems = [
  { title: "About Us", href: "/about" },
  { title: "Our Mission", href: "/about/mission" },
  { title: "Leadership", href: "/about/leadership" },
  { title: "Locations", href: "/about/locations" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Region Banner */}
      <div className="bg-hero text-hero-foreground py-2 text-sm">
        <div className="container-slr flex items-center justify-center gap-4">
          <span className="font-body">Choose your region to see content specific to your location</span>
          <select className="bg-card text-foreground px-3 py-1 rounded text-sm font-body border-0">
            <option>USA</option>
            <option>Europe</option>
            <option>Asia-Pacific</option>
            <option>Canada</option>
          </select>
          <Button variant="accent" size="sm" className="font-body">
            Continue
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-hero text-hero-foreground sticky top-0 z-50">
        <div className="container-slr flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
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
              <span className="text-2xl font-display font-semibold tracking-tight">SLR</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-hero/80 font-body">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4">
                      {solutions.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="mt-2 pt-2 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link to="/solutions" className="flex items-center gap-1 p-3 text-primary font-medium font-body">
                            View All Solutions <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-hero/80 font-body">
                    Sectors
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4">
                      {sectors.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="mt-2 pt-2 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link to="/sectors" className="flex items-center gap-1 p-3 text-primary font-medium font-body">
                            View All Sectors <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-hero/80 font-body">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4">
                      {services.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="mt-2 pt-2 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link to="/services" className="flex items-center gap-1 p-3 text-primary font-medium font-body">
                            View All Services <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/projects" className="px-4 py-2 text-sm font-body hover:text-primary-light transition-colors">
                    Projects
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-hero/80 font-body">
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-1 p-4">
                      {aboutItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/careers" className="px-4 py-2 text-sm font-body hover:text-primary-light transition-colors">
                    Careers
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className="px-4 py-2 text-sm font-body hover:text-primary-light transition-colors">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-64 bg-hero-foreground/10 border border-hero-foreground/20 rounded px-4 py-2 text-sm text-hero-foreground placeholder:text-hero-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary-light font-body"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hero-foreground/60" />
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
              <Link to="/solutions" className="block py-2 font-body">Solutions</Link>
              <Link to="/sectors" className="block py-2 font-body">Sectors</Link>
              <Link to="/services" className="block py-2 font-body">Services</Link>
              <Link to="/projects" className="block py-2 font-body">Projects</Link>
              <Link to="/about" className="block py-2 font-body">About</Link>
              <Link to="/careers" className="block py-2 font-body">Careers</Link>
              <Link to="/contact" className="block py-2 font-body">Contact</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
