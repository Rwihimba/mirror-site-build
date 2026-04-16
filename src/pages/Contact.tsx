import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { trackFormSubmit } from "@/lib/analytics";
import norrskenHouse from "@/assets/norrsken-house.jpg";
import contactHero from "@/assets/contact-hero.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", region: "", enquiryType: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await supabase.from("form_submissions").insert({
      form_type: "contact",
      data: formData,
    });
    trackFormSubmit("contact", { enquiry_type: formData.enquiryType || "unspecified" });
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setFormData({ name: "", email: "", company: "", region: "", enquiryType: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <SEO
        title="Contact MineTech | Get in Touch"
        description="Get in touch with MineTech — Africa's leading mining technology startup. Reach our team in Kigali, Rwanda for demos, partnerships and investment inquiries."
        keywords="contact mining technology, MineTech Rwanda, mining tech demo, African mining startup contact"
      />
      {/* Hero Section */}
      <section className="relative bg-hero text-hero-foreground py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={contactHero} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-hero/70" />
        </div>
        
        <div className="container-slr relative z-10">
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

      {/* Location Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Info */}
            <div>
              <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                We're here to support you in Making Mining Intelligence Accessible. Get in touch for a collaborative discussion about what that could look like for your organisation.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold mb-1">Norrsken House Kigali</h3>
                    <p className="text-muted-foreground font-body">1 KN8ST, Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@minetech.co.rw" className="text-foreground font-body hover:text-primary transition-colors">
                    info@minetech.co.rw
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+250784725226" className="text-foreground font-body hover:text-primary transition-colors">
                    +250 784 725 226
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="rounded-lg overflow-hidden">
              <img
                src={norrskenHouse}
                alt="Norrsken House Kigali - MineTech Office"
                loading="lazy"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary p-8 md:p-10 rounded-lg">
              <h2 className="text-2xl font-display font-semibold mb-2">Get in touch</h2>
              <p className="text-muted-foreground font-body mb-8">
                Fill in the below form and we'll get you to the right place.
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="text"
                    placeholder="Name*"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email*"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Company*"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background border-border font-body"
                  />
                </div>
                <div>
                  <Select value={formData.region} onValueChange={(val) => setFormData({ ...formData, region: val })}>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Region*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                      <SelectItem value="east-africa">East Africa</SelectItem>
                      <SelectItem value="central-africa">Central Africa</SelectItem>
                      <SelectItem value="west-africa">West Africa</SelectItem>
                      <SelectItem value="southern-africa">Southern Africa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={formData.enquiryType} onValueChange={(val) => setFormData({ ...formData, enquiryType: val })}>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Enquiry Type*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="demo">Request a Demo</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="investment">Investment Enquiry</SelectItem>
                      <SelectItem value="careers">Careers</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border font-body resize-none"
                  />
                </div>
                <Button type="submit" className="group" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
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
