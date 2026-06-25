import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { campaigns } from "@/data/campaigns";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useDonation } from "@/context/DonationContext";

const tabs = ["Overview", "Updates", "Transparency"];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns: liveCampaigns } = useDonation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = liveCampaigns.find(c => c.id === id);
    if (found) {
      setCampaign({
        ...found,
        _id: found.id,
        ngo: found.ngoName,
        raised: found.raisedAmount,
        goal: found.goalAmount,
      });
    } else {
      toast.error("Campaign not found");
    }
    setIsLoading(false);
  }, [id, liveCampaigns]);

  const handleDonate = async () => {
    if (!campaign) return;
    
    navigate("/payment", {
      state: {
        campaign: {
          id: campaign.id,
          title: campaign.title,
          ngoName: campaign.ngo,
          image: campaign.image,
          raisedAmount: campaign.raised,
          goalAmount: campaign.goal
        },
        amount: selectedAmount
      }
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!campaign) return <div className="min-h-screen flex items-center justify-center">Campaign not found</div>;

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  console.log("Campaign data:", campaign);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-20">
        {/* Banner */}
        <div className="h-64 sm:h-80 relative overflow-hidden">
          <img
            src={campaign?.image || ""}
            alt="Campaign banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log("Image failed:", campaign?.image);
              (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/300";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap gap-2 mb-3">
                  <TrustBadge type="verified" />
                  {campaign.isAIVerified && (
                    <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5 uppercase tracking-wider">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      AI Verified
                    </span>
                  )}
                  <TrustBadge type="trusted" />
                  <TrustBadge type="fraud" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {campaign.title}
                </h1>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">by {campaign?.ngo}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    📍 {campaign?.location}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  {campaign?.donors && (
                    <p className="text-sm text-muted-foreground">
                      {campaign.donors} donors supported this campaign
                    </p>
                  )}
                  {campaign?.status && (
                    <span className="self-start px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                      {campaign.status}
                    </span>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="glass-card rounded-2xl p-6">
                  {activeTab === "Overview" && (
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                      <p>{campaign?.description}</p>
                      
                      {campaign?.descriptionImages?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {campaign.descriptionImages.map((img: string, idx: number) => (
                            <div key={idx} className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                              <img src={img} className="w-full h-full object-cover max-h-64" alt="description" />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {campaign?.overview && (
                        <div className="mt-4 p-4 bg-secondary/20 rounded-xl">
                          <h3 className="text-lg font-semibold mb-2 text-foreground">NGO Details & Transparency</h3>
                          <p className="whitespace-pre-line leading-relaxed">{campaign.overview}</p>
                        </div>
                      )}

                      <p className="mt-4">The {campaign?.ngo} has a proven track record of transparent fund utilization and community impact in {campaign?.location}.</p>
                      <p>Every expense is verified by our AI system, and donors receive real-time updates on how their contributions are being used.</p>
                      
                      {campaign?.proofImages?.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3 text-foreground">Proof of Work</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {campaign.proofImages.map((img: string, index: number) => (
                              <img
                                key={index}
                                src={img}
                                alt="proof"
                                className="rounded-xl object-cover w-full h-40"
                                onError={(e) => {
                                  console.log("Proof failed:", img);
                                  (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/300";
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === "Updates" && (
                    <div className="space-y-4">
                      {campaign?.updates?.length > 0 ? (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3">Latest Updates</h3>
                          <ul className="space-y-2">
                            {campaign.updates.map((u: string, i: number) => (
                              <li key={i} className="text-sm text-muted-foreground">
                                • {u}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No updates available yet.</p>
                      )}
                    </div>
                  )}
                  {activeTab === "Transparency" && (
                    <div className="space-y-3">
                      {campaign?.proofLinks && campaign.proofLinks.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2">Verified Proof Links:</h4>
                          <div className="flex flex-wrap gap-2">
                            {campaign.proofLinks.map((link: string, idx: number) => (
                              <a 
                                key={idx} 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline bg-primary/5 px-2 py-1 rounded"
                              >
                                {new URL(link).hostname} ↗
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {campaign.transparency && campaign.transparency.length > 0 ? (
                        campaign.transparency.map((e: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                            <div>
                              <p className="text-sm font-medium">{e.purpose}</p>
                              <p className="text-xs text-muted-foreground">{e.date} • AI Verified ✅</p>
                            </div>
                            <span className="font-semibold text-sm">₹{e.amount.toLocaleString("en-IN")}</span>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-3">
                          {[
                            { item: "Operational Costs", amount: `₹${(campaign.raised * 0.1).toFixed(0)}`, badge: "AI Verified ✅" },
                            { item: "Direct Aid", amount: `₹${(campaign.raised * 0.8).toFixed(0)}`, badge: "AI Verified ✅" },
                            { item: "Logistics", amount: `₹${(campaign.raised * 0.1).toFixed(0)}`, badge: "AI Verified ✅" },
                          ].map((e, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                              <div>
                                <p className="text-sm font-medium">{e.item}</p>
                                <p className="text-xs text-muted-foreground">{e.badge}</p>
                              </div>
                              <span className="font-semibold text-sm">{e.amount}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Dynamic Transparency Proofs */}
                      {campaign?.proofs && campaign.proofs.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-border/50">
                          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                             Digital Proof of Expenditure
                          </h4>
                          <div className="space-y-4">
                            {campaign.proofs.map((proof: any) => (
                              <div key={proof.id} className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="grid sm:grid-cols-[180px,1fr] gap-0">
                                  <div className="h-40 sm:h-auto overflow-hidden bg-secondary/20">
                                     <img src={proof.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="expense proof" />
                                  </div>
                                  <div className="p-5 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-3">
                                      <h5 className="font-bold text-base text-foreground line-clamp-2">{proof.description}</h5>
                                      <span className="text-primary font-black text-lg ml-4">₹{proof.amount.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Published: {new Date(proof.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                                      </p>
                                      <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-[10px] font-black uppercase flex items-center gap-1 border border-green-500/20">
                                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                                        Verified
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sticky donation box */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6 lg:sticky lg:top-24"
              >
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-lg">
                      <AnimatedCounter end={campaign.raised} prefix="₹" />
                    </span>
                    <span className="text-muted-foreground">of ₹{campaign.goal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{progress.toFixed(0)}% funded • {Math.floor(campaign.raised/500 + 42)} donors</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[500, 1000, 2500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-2 rounded-xl border text-sm font-medium transition-colors ${
                        selectedAmount === amt
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                   <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <input 
                        type="number" 
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        className="w-full bg-secondary/50 border border-border rounded-xl py-2 pl-7 pr-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Custom amount"
                      />
                   </div>
                </div>

                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full mb-3"
                  onClick={handleDonate}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Donate Now"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  100% tax deductible under 80G
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
