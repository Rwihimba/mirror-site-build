import { useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const InvestDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    investmentRange: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await supabase.from("form_submissions").insert({
      form_type: "invest",
      data: formData,
    });
    trackFormSubmit("invest", { investment_range: formData.investmentRange || "unspecified" });

    toast({
      title: "Investment inquiry received",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });

    setFormData({ name: "", email: "", company: "", investmentRange: "", message: "" });
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero-accent" className="group">
          Invest
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Invest in MineTech</DialogTitle>
          <DialogDescription className="font-body">
            Join us in transforming African mining through intelligent technology. Fill out the form below and our investment team will reach out.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invest-name">Full Name *</Label>
              <Input
                id="invest-name"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invest-email">Email *</Label>
              <Input
                id="invest-email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invest-company">Company / Organization</Label>
            <Input
              id="invest-company"
              maxLength={150}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Investment Firm LLC"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invest-range">Investment Range</Label>
            <Select
              value={formData.investmentRange}
              onValueChange={(value) => setFormData({ ...formData, investmentRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select investment range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-50k">Under $50,000</SelectItem>
                <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                <SelectItem value="over-5m">Over $5,000,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invest-message">Message</Label>
            <Textarea
              id="invest-message"
              maxLength={1000}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your investment interests and goals..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Investment Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvestDialog;