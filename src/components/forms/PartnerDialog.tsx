import { useState } from "react";
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

const PartnerDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    partnershipType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await supabase.from("form_submissions").insert({
      form_type: "partner",
      data: formData,
    });

    toast({
      title: "Partnership inquiry received",
      description: "Thank you for your interest in partnering with us. We will be in touch soon.",
    });

    setFormData({ name: "", email: "", company: "", partnershipType: "", message: "" });
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero-accent" className="group">
          Partner
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Partner with MineTech</DialogTitle>
          <DialogDescription className="font-body">
            Explore partnership opportunities to bring mining intelligence to operations across Africa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partner-name">Full Name *</Label>
              <Input
                id="partner-name"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-email">Email *</Label>
              <Input
                id="partner-email"
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
            <Label htmlFor="partner-company">Company / Organization *</Label>
            <Input
              id="partner-company"
              required
              maxLength={150}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Mining Solutions Ltd"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner-type">Partnership Type</Label>
            <Select
              value={formData.partnershipType}
              onValueChange={(value) => setFormData({ ...formData, partnershipType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select partnership type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology Integration Partner</SelectItem>
                <SelectItem value="reseller">Reseller / Distribution Partner</SelectItem>
                <SelectItem value="implementation">Implementation Partner</SelectItem>
                <SelectItem value="consulting">Consulting Partner</SelectItem>
                <SelectItem value="other">Other Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner-message">Partnership Proposal</Label>
            <Textarea
              id="partner-message"
              maxLength={1000}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your partnership proposal and how we can work together..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDialog;