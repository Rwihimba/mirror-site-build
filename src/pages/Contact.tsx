import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground py-12 md:py-16">
        <div className="container-slr">
          <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span>›</span>
            <span>Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight animate-slide-in-left">
            Contact
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                We're here to support you in Making Sustainability Happen. Get in touch for a collaborative discussion about what that could look like for your organisation.
              </p>
              <Link to="/about/locations" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors">
                Our locations
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right - Form */}
            <div className="bg-secondary p-8 md:p-10 rounded-lg">
              <h2 className="text-2xl font-display font-semibold mb-2">Get in touch</h2>
              <p className="text-muted-foreground font-body mb-8">
                Fill in the below form and we'll get you to the right place.
              </p>
              
              <form className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Name*"
                    required
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email*"
                    required
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Company*"
                    required
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Region*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="apac">Asia-Pacific</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="latam">Latin America</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Enquiry Type*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="info">Request Information about SLR's Services</SelectItem>
                      <SelectItem value="proposal">Request a Proposal</SelectItem>
                      <SelectItem value="offer">Offer of service/goods to SLR</SelectItem>
                      <SelectItem value="recruitment">Recruitment/Career</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message..."
                    rows={5}
                    className="bg-background border-border font-body resize-none"
                  />
                </div>
                <Button type="submit" className="group">
                  Submit
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
