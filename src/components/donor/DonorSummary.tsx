import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Gift } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useEffect, useState } from "react";
import { campaigns as dummyCampaigns } from "@/data/campaigns";
import { CampaignCard } from "@/components/CampaignCard";

export function DonorSummary() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const formattedData = dummyCampaigns.slice(0, 3).map(c => ({
        ...c,
        _id: c.id,
        ngo: c.ngoName,
        raised: c.raisedAmount,
        goal: c.goalAmount,
    }));
    setCampaigns(formattedData);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: IndianRupee, label: "Total Donated", value: 10000, prefix: "₹" },
          { icon: Gift, label: "Campaigns Supported", value: 4, prefix: "" },
          { icon: TrendingUp, label: "Impact Score", value: 92, prefix: "", suffix: "%" },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold">
              <AnimatedCounter end={s.value} prefix={s.prefix} suffix={s.suffix || ""} />
            </p>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Impact Summary</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Your contributions have helped provide meals for 150 families and clean water for 2 communities this month. Keep up the great work!
          </p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-[75%] gradient-primary" />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">75% of your monthly goal reached</p>
        </div>
        <div className="lg:col-span-1 glass-card rounded-2xl p-6 bg-accent/5">
          <h2 className="font-semibold mb-2 text-sm">Top Support Category</h2>
          <div className="flex items-center gap-2 text-accent">
            <Gift className="h-4 w-4" />
            <span className="text-lg font-bold">Healthcare</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Suggested <span className="gradient-text">Campaigns</span></h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c, i) => (
          <CampaignCard 
            key={c._id}
            id={c._id}
            title={c.title}
            ngo={c.ngo}
            image={c.image}
            raised={c.raised}
            goal={c.goal}
            category={c.category}
            location={c.location}
          />
        ))}
      </div>
    </motion.div>
  );
}
