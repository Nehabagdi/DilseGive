import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Eye, Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { campaigns as dummyCampaigns } from "@/data/campaigns";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // format the campaigns so they match the expected format
    const formattedData = dummyCampaigns.map(c => ({
      ...c,
      _id: c.id,
      ngo: c.ngoName,
      raised: c.raisedAmount,
      goal: c.goalAmount,
    }));
    setCampaigns(formattedData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
              <p className="text-muted-foreground">Manage verified campaigns and users across DilSeGive.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">1,240 Users</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">Verified Platform</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/20">
              <h2 className="font-semibold text-lg">Campaign Moderation</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/10 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Campaign</th>
                    <th className="px-6 py-4">NGO</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Raised / Goal</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-10 text-center">Loading campaigns...</td></tr>
                  ) : campaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm max-w-[200px] truncate">{c.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{c.category} • {c.location}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{c.ngo}</td>
                      <td className="px-6 py-4">
                        <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {c.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold italic">
                        ₹{c.raised.toLocaleString("en-IN")} / ₹{c.goal.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-500/10 hover:text-green-500">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
