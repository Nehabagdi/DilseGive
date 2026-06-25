import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Q1 Impact Report 2026", date: "Apr 5, 2026", type: "Quarterly" },
  { title: "Annual Charity Review 2025", date: "Jan 10, 2026", type: "Annual" },
  { title: "Education Campaign Audit", date: "Dec 15, 2025", type: "Audit" },
];

export function ImpactReports() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Impact Reports</h2>
        <div className="space-y-4">
          {reports.map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.date} • {report.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
