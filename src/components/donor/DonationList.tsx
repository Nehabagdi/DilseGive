import { motion } from "framer-motion";

const donations = [
  { campaign: "Food for 500 Families", ngo: "Annapurna Foundation", amount: 2500, date: "Apr 2, 2026", status: "Utilized" },
  { campaign: "Clean Water Initiative", ngo: "Jal Jeevan Trust", amount: 1000, date: "Mar 20, 2026", status: "In Progress" },
  { campaign: "Education Kits for Children", ngo: "Shiksha Seva", amount: 5000, date: "Mar 5, 2026", status: "Utilized" },
  { campaign: "Medical Aid for Flood Victims", ngo: "SwasthyaCare India", amount: 1500, date: "Feb 15, 2026", status: "Utilized" },
];

export function DonationList() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold mb-4">My Donations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Campaign</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">NGO</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Amount</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 font-medium">{d.campaign}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{d.ngo}</td>
                  <td className="py-3 px-2 text-right font-medium">₹{d.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground hidden md:table-cell">{d.date}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      d.status === "Utilized"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
