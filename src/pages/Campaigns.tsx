import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDonation } from "@/context/DonationContext";

export default function Campaigns() {
  const { campaigns } = useDonation();
  const [campaignList, setCampaignList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    setCampaignList(campaigns.map(c => ({
      ...c,
      _id: c.id,
      ngo: c.ngoName,
      raised: c.raisedAmount,
      goal: c.goalAmount,
    })));
    setIsLoading(false);
  }, [campaigns]);

  const locations = ["All", ...new Set(campaignList.map(c => c.location))];

  const filteredCampaigns = campaignList.filter((campaign) => {
    const term = searchTerm.toLowerCase();
    
    const matchesSearch = 
      campaign.title.toLowerCase().includes(term) ||
      campaign.ngo.toLowerCase().includes(term) ||
      campaign.category.toLowerCase().includes(term) ||
      campaign.location.toLowerCase().includes(term);

    const matchesLocation = 
      selectedLocation === "All" || 
      campaign.location === selectedLocation;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Active <span className="gradient-text">Campaigns</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse verified campaigns and make your donation count.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-10 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search campaigns, NGOs, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-card text-card-foreground shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              />
            </div>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2.5 rounded-xl border bg-card text-card-foreground shadow-sm focus:ring-2 focus:ring-primary focus:outline-none min-w-[150px] cursor-pointer transition-all"
            >
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p className="animate-pulse text-muted-foreground">Loading campaigns...</p>
            </div>
          ) : (
            <>
              {filteredCampaigns.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg italic">No campaigns found for the selected filters.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map((c, i) => (
                    <motion.div
                      key={c._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <CampaignCard 
                        id={c._id} 
                        title={c.title} 
                        ngo={c.ngo} 
                        image={c.image} 
                        raised={c.raised} 
                        goal={c.goal} 
                        category={c.category}
                        location={c.location}
                        donors={c.donors}
                        isAIVerified={c.isAIVerified}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
