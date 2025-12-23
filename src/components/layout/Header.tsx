import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, Menu, X, ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

const contentHub = [
  { title: "Insights", href: "/insights" },
  { title: "News", href: "/news" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Reports", href: "/reports" },
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
    <header className="bg-hero text-hero-foreground sticky top-0 z-50">
      <div className="container-slr flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 40 40" className="w-7 h-7 text-primary-light">
              <circle cx="20" cy="8" r="4" fill="currentColor" />
              <circle cx="8" cy="20" r="4" fill="currentColor" />
              <circle cx="32" cy="20" r="4" fill="currentColor" />
              <circle cx="20" cy="32" r="4" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="28" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="28" r="3" fill="currentColor" />
              <circle cx="28" cy="28" r="3" fill="currentColor" />
            </svg>
            <span className="text-xl font-display font-semibold tracking-tight">SLR</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-transparent hover:text-primary-light data-[state=open]:bg-transparent font-body text-sm px-3 h-auto py-2">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-card text-card-foreground shadow-lg rounded-md">
                    {solutions.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body text-sm"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="mt-2 pt-2 border-t border-border">
                      <NavigationMenuLink asChild>
                        <Link to="/solutions" className="flex items-center gap-1 p-3 text-primary font-medium font-body text-sm">
                          View All Solutions <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-transparent hover:text-primary-light data-[state=open]:bg-transparent font-body text-sm px-3 h-auto py-2">
                  Sectors
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-card text-card-foreground shadow-lg rounded-md">
                    {sectors.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body text-sm"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="mt-2 pt-2 border-t border-border">
                      <NavigationMenuLink asChild>
                        <Link to="/sectors" className="flex items-center gap-1 p-3 text-primary font-medium font-body text-sm">
                          View All Sectors <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-transparent hover:text-primary-light data-[state=open]:bg-transparent font-body text-sm px-3 h-auto py-2">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-card text-card-foreground shadow-lg rounded-md">
                    {services.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body text-sm"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="mt-2 pt-2 border-t border-border">
                      <NavigationMenuLink asChild>
                        <Link to="/services" className="flex items-center gap-1 p-3 text-primary font-medium font-body text-sm">
                          View All Services <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/projects" className="px-3 py-2 text-sm font-body hover:text-primary-light transition-colors">
                  Projects
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-transparent hover:text-primary-light data-[state=open]:bg-transparent font-body text-sm px-3 h-auto py-2">
                  Content Hub
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-4 bg-card text-card-foreground shadow-lg rounded-md">
                    {contentHub.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body text-sm"
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
                <NavigationMenuTrigger className="bg-transparent text-hero-foreground hover:bg-transparent hover:text-primary-light data-[state=open]:bg-transparent font-body text-sm px-3 h-auto py-2">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-4 bg-card text-card-foreground shadow-lg rounded-md">
                    {aboutItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted font-body text-sm"
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
                <Link to="/careers" className="px-3 py-2 text-sm font-body hover:text-primary-light transition-colors">
                  Careers
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="px-3 py-2 text-sm font-body hover:text-primary-light transition-colors">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
            <Link to="/solutions" className="block py-2 font-body text-sm">Solutions</Link>
            <Link to="/sectors" className="block py-2 font-body text-sm">Sectors</Link>
            <Link to="/services" className="block py-2 font-body text-sm">Services</Link>
            <Link to="/projects" className="block py-2 font-body text-sm">Projects</Link>
            <Link to="/content-hub" className="block py-2 font-body text-sm">Content Hub</Link>
            <Link to="/about" className="block py-2 font-body text-sm">About</Link>
            <Link to="/careers" className="block py-2 font-body text-sm">Careers</Link>
            <Link to="/contact" className="block py-2 font-body text-sm">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
