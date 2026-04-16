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

const QuoteDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mineType: "",
    employees: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await supabase.from("form_submissions").insert({
      form_type: "quote",
      data: formData,
    });
    trackFormSubmit("quote");

    toast({
      title: "Quote request received",
      description: "Thank you for your interest. Our team will prepare a customized quote for you.",
    });

    setFormData({ name: "", email: "", company: "", mineType: "", employees: "", requirements: "" });
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero-accent" className="group">
          Get a Quote
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Get a Quote</DialogTitle>
          <DialogDescription className="font-body">
            Tell us about your mining operation and we will provide a customized quote for MineTech deployment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-name">Full Name *</Label>
              <Input
                id="quote-name"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-email">Email *</Label>
              <Input
                id="quote-email"
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
            <Label htmlFor="quote-company">Mining Company / Operation *</Label>
            <Input
              id="quote-company"
              required
              maxLength={150}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="ABC Mining Ltd"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-type">Mine Type</Label>
              <Select
                value={formData.mineType}
                onValueChange={(value) => setFormData({ ...formData, mineType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open-pit">Open Pit</SelectItem>
                  <SelectItem value="underground">Underground</SelectItem>
                  <SelectItem value="artisanal">Artisanal</SelectItem>
                  <SelectItem value="processing">Processing Only</SelectItem>
                  <SelectItem value="mixed">Mixed Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-employees">Number of Employees</Label>
              <Select
                value={formData.employees}
                onValueChange={(value) => setFormData({ ...formData, employees: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1 - 50</SelectItem>
                  <SelectItem value="51-200">51 - 200</SelectItem>
                  <SelectItem value="201-500">201 - 500</SelectItem>
                  <SelectItem value="501-1000">501 - 1,000</SelectItem>
                  <SelectItem value="1000+">1,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-requirements">Requirements & Challenges</Label>
            <Textarea
              id="quote-requirements"
              maxLength={1000}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Describe your current challenges and what departments or workflows you want to digitize..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;