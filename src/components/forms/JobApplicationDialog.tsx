import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight } from "lucide-react";

interface JobApplicationDialogProps {
  jobTitle: string;
  category: string;
  children?: React.ReactNode;
}

export function JobApplicationDialog({ jobTitle, category, children }: JobApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const isTechnical = category === "Core Technical";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => { data[key] = String(val); });
    data.jobTitle = jobTitle;
    data.category = category;

    await supabase.from("form_submissions").insert({
      form_type: "job_application",
      data,
    });

    toast({
      title: "Application Submitted!",
      description: `Thank you for applying for ${jobTitle}. We'll review your application and get back to you soon.`,
    });

    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="mt-4 group">
            Apply Now
            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Apply for {jobTitle}</DialogTitle>
          <DialogDescription className="font-body">
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              required
              className="font-body"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-body">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="font-body"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="font-body">Department</Label>
            <Input
              id="department"
              name="department"
              value={category}
              readOnly
              className="font-body bg-muted cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="font-body">Position</Label>
            <Input
              id="position"
              name="position"
              value={jobTitle}
              readOnly
              className="font-body bg-muted cursor-not-allowed"
            />
          </div>

          {isTechnical && (
            <div className="space-y-2">
              <Label htmlFor="github" className="font-body">GitHub Profile</Label>
              <Input
                id="github"
                name="github"
                type="url"
                placeholder="https://github.com/yourusername"
                className="font-body"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="cv" className="font-body">Upload CV/Resume *</Label>
            <Input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="font-body cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-xs text-muted-foreground font-body">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="font-body">Portfolio/LinkedIn (Optional)</Label>
            <Input
              id="portfolio"
              name="portfolio"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              className="font-body"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-body"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}