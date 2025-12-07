import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const projects = [
  {
    id: 1,
    title: "Climate physical and transition risk assessment for Tronox",
    client: "Tronox",
    sector: "Mining",
    region: "Global",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/ae3f8370a68fd9c400341ca9b72f609c7a00c606-3004x1997.jpg?w=600",
  },
  {
    id: 2,
    title: "V20 Group funding programme for climate change adaptation",
    client: "UNIDO",
    sector: "Government & Communities",
    region: "Global",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/b01e368b7ec919a448948544869e4c4f2978a8bf-768x427.png?w=600",
  },
  {
    id: 3,
    title: "Energy management, decarbonisation and circularity for the chemicals sector",
    client: "Anonymous",
    sector: "Energy",
    region: "International",
    image: "https://cdn.sanity.io/images/b0ecix6u/production/03e6f967abb7a9abeecbe7a8bb00e38569104208-4288x2848.jpg?w=600",
  },
  {
    id: 4,
    title: "Strategic sustainability planning for urban development",
    client: "City Council",
    sector: "Government",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
  },
  {
    id: 5,
    title: "Renewable energy integration assessment",
    client: "Power Corp",
    sector: "Energy",
    region: "North America",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
  },
  {
    id: 6,
    title: "Biodiversity impact assessment for mining operations",
    client: "Mining Co",
    sector: "Mining",
    region: "Australia",
    image: "https://images.unsplash.com/photo-1605126945430-7be6a9e0db03?w=600",
  },
];

const Projects = () => {
  const [regionFilter, setRegionFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground py-12 md:py-16">
        <div className="container-slr">
          <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span>›</span>
            <span>Projects</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight animate-slide-in-left">
            Projects
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-slr">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-body font-medium">Filter</span>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="apac">Asia-Pacific</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="mining">Mining</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article key={project.id} className="group card-hover bg-card rounded-lg overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-card">
                    <span className="bg-card/20 backdrop-blur px-3 py-1 rounded text-sm font-body">Project</span>
                    <span className="text-sm font-body flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.region}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2 font-body">
                    <span>{project.client}</span>
                    <span>{project.sector}</span>
                  </div>
                  <h3 className="text-lg font-display font-medium mb-4 line-clamp-2">{project.title}</h3>
                  <div className="border-t border-border pt-4">
                    <Link to={`/projects/${project.id}`} className="link-arrow text-sm font-medium text-primary font-body">
                      Read more
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
