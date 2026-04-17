import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash2, Eye, BarChart3, FileText, RefreshCw, Briefcase, Users, MousePointerClick, LineChart } from "lucide-react";
import { JobsManager } from "@/components/admin/JobsManager";
import { ApplicantsManager } from "@/components/admin/ApplicantsManager";
import { PopupAnalytics } from "@/components/admin/PopupAnalytics";
import { GoogleAnalytics } from "@/components/admin/GoogleAnalytics";

interface FormSubmission {
  id: string;
  form_type: string;
  data: Record<string, unknown>;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PageView {
  id: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [subRes, pvRes] = await Promise.all([
      supabase.from("form_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (subRes.data) setSubmissions(subRes.data as FormSubmission[]);
    if (pvRes.data) setPageViews(pvRes.data as PageView[]);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("form_submissions")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      toast({ title: "Updated", description: "Status updated successfully." });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("form_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(prev => prev.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
      toast({ title: "Deleted", description: "Submission removed." });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filteredSubmissions = filterType === "all"
    ? submissions
    : submissions.filter(s => s.form_type === filterType);

  const statusColor = (status: string) => {
    if (status === "new") return "default";
    if (status === "reviewed") return "secondary";
    return "outline";
  };

  // Analytics
  const totalViews = pageViews.length;
  const todayViews = pageViews.filter(v => new Date(v.created_at).toDateString() === new Date().toDateString()).length;
  const topPages = Object.entries(
    pageViews.reduce<Record<string, number>>((acc, v) => { acc[v.path] = (acc[v.path] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const newCount = submissions.filter(s => s.status === "new").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-display font-semibold">MineTech Admin</h1>
          {newCount > 0 && (
            <Badge variant="destructive">{newCount} new</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={fetchData}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-body">Total Submissions</p>
            <p className="text-2xl font-display font-semibold">{submissions.length}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-body">New Submissions</p>
            <p className="text-2xl font-display font-semibold text-primary">{newCount}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-body">Total Page Views</p>
            <p className="text-2xl font-display font-semibold">{totalViews}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-body">Today's Views</p>
            <p className="text-2xl font-display font-semibold text-primary">{todayViews}</p>
          </div>
        </div>

        <Tabs defaultValue="submissions">
          <TabsList>
            <TabsTrigger value="submissions" className="gap-1">
              <FileText className="w-4 h-4" /> Submissions
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-1">
              <Briefcase className="w-4 h-4" /> Jobs
            </TabsTrigger>
            <TabsTrigger value="applicants" className="gap-1">
              <Users className="w-4 h-4" /> Applicants
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1">
              <BarChart3 className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="popups" className="gap-1">
              <MousePointerClick className="w-4 h-4" /> Popups
            </TabsTrigger>
            <TabsTrigger value="ga" className="gap-1">
              <LineChart className="w-4 h-4" /> Google Analytics
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="quote">Quote</SelectItem>
                  <SelectItem value="invest">Investment</SelectItem>
                  <SelectItem value="partner">Partnership</SelectItem>
                  <SelectItem value="job_application">Job Application</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Table */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading...</div>
                  ) : filteredSubmissions.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No submissions yet.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Name / Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions.map(sub => (
                          <TableRow key={sub.id} className={selectedSubmission?.id === sub.id ? "bg-muted/50" : ""}>
                            <TableCell>
                              <Badge variant="outline" className="capitalize text-xs">
                                {sub.form_type.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-body text-sm">
                              <div>{(sub.data as Record<string, string>)?.name || "—"}</div>
                              <div className="text-xs text-muted-foreground">{(sub.data as Record<string, string>)?.email || ""}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={statusColor(sub.status)} className="capitalize text-xs">
                                {sub.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(sub.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(sub)}>
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(sub.id)}>
                                  <Trash2 className="w-3 h-3 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>

              {/* Detail Panel */}
              <div>
                {selectedSubmission ? (
                  <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold capitalize">
                        {selectedSubmission.form_type.replace("_", " ")}
                      </h3>
                      <Select
                        value={selectedSubmission.status}
                        onValueChange={(val) => handleStatusChange(selectedSubmission.id, val)}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(selectedSubmission.data as Record<string, unknown>).map(([key, val]) => (
                        <div key={key}>
                          <p className="text-xs text-muted-foreground capitalize font-body">{key.replace(/([A-Z])/g, " $1")}</p>
                          <p className="text-sm font-body">{String(val || "—")}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Submitted: {new Date(selectedSubmission.created_at).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-6 text-center text-muted-foreground text-sm">
                    Select a submission to view details
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="mt-6">
            <JobsManager />
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants" className="mt-6">
            <ApplicantsManager />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-display font-semibold mb-4">Top Pages</h3>
                {topPages.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {topPages.map(([path, count]) => (
                      <div key={path} className="flex items-center justify-between">
                        <span className="text-sm font-body truncate mr-4">{path}</span>
                        <span className="text-sm font-display font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-display font-semibold mb-4">Recent Visits</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {pageViews.slice(0, 20).map(view => (
                    <div key={view.id} className="flex items-center justify-between text-sm border-b border-border pb-2">
                      <span className="font-body truncate mr-4">{view.path}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(view.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Popups Tab */}
          <TabsContent value="popups" className="mt-6">
            <PopupAnalytics />
          </TabsContent>

          {/* Google Analytics Tab */}
          <TabsContent value="ga" className="mt-6">
            <GoogleAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
