import React, { createContext, useContext, useState, useEffect } from "react";
import { campaigns as initialCampaigns } from "@/data/campaigns";

interface DonationContextType {
  campaigns: any[];
  donate: (campaignId: string, amount: number) => void;
  addCampaign: (newCampaign: any) => void;
  addProof: (campaignId: string, proofData: any) => void;
}

const DonationContext = createContext<DonationContextType | null>(null);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const savedLocal = localStorage.getItem("local_campaigns");
    const localCampaigns = savedLocal ? JSON.parse(savedLocal) : [];
    
    const savedStaticOverrides = localStorage.getItem("static_campaign_overrides");
    const staticOverrides = savedStaticOverrides ? JSON.parse(savedStaticOverrides) : {};
    
    // Merge local campaigns with static ones, applying overrides to static ones
    const merged = [...localCampaigns];
    initialCampaigns.forEach(staticCamp => {
      const override = staticOverrides[staticCamp.id] || {};
      const combinedProofs = [...(staticCamp.proofs || []), ...(override.proofs || [])];
      
      const campaignWithOverrides = {
        ...staticCamp,
        ...override,
        // Ensure arrays are merged or overridden correctly
        proofs: combinedProofs,
        // Auto calculate isAIVerified
        isAIVerified: combinedProofs.some((p: any) => p.score >= 90)
      };
      
      if (!merged.find(c => c.id === staticCamp.id)) {
        merged.push(campaignWithOverrides);
      }
    });

    // Ensure all campaigns have isAIVerified calculated
    const finalMerged = merged.map(c => ({
      ...c,
      isAIVerified: c.proofs?.some((p: any) => p.score >= 90) || false
    }));

    setCampaigns(finalMerged);
  }, []);

  const donate = (campaignId: string, amount: number) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => {
        if (c.id === campaignId) {
          return {
            ...c,
            raisedAmount: (c.raisedAmount || 0) + amount,
            donors: (c.donors || Math.floor(Math.random() * 500) + 200) + 1,
          };
        }
        return c;
      });

      syncToLocalStorage(updated, campaignId);
      return updated;
    });
  };

  const addCampaign = (newCampaign: any) => {
    const campaignWithVerify = {
      ...newCampaign,
      isAIVerified: newCampaign.proofs?.some((p: any) => p.score >= 90) || false
    };
    
    setCampaigns((prev) => [campaignWithVerify, ...prev]);
    
    const saved = localStorage.getItem("local_campaigns");
    const localCampaigns = saved ? JSON.parse(saved) : [];
    localStorage.setItem("local_campaigns", JSON.stringify([campaignWithVerify, ...localCampaigns]));
  };

  const addProof = (campaignId: string, proofData: any) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => {
        if (c.id === campaignId) {
          const newProofs = [...(c.proofs || []), proofData];
          return {
            ...c,
            proofs: newProofs,
            // Automatic calculation based on verified proof condition (score >= 90)
            isAIVerified: newProofs.some((p: any) => p.score >= 90),
            // Updated after proof submission: raised amount
            raisedAmount: (c.raisedAmount || 0) + Number(proofData.amount),
          };
        }
        return c;
      });

      syncToLocalStorage(updated, campaignId);
      return updated;
    });
  };

  const syncToLocalStorage = (allCampaigns: any[], updatedId: string) => {
    // Determine if it's a local campaign
    const localSaved = localStorage.getItem("local_campaigns");
    const localCampaigns = localSaved ? JSON.parse(localSaved) : [];
    const isLocal = localCampaigns.find((lc: any) => lc.id === updatedId);

    if (isLocal) {
      const updatedLocal = allCampaigns.filter(c => localCampaigns.find((lc: any) => lc.id === c.id));
      localStorage.setItem("local_campaigns", JSON.stringify(updatedLocal));
    } else {
      // It's a static campaign, update overrides
      const staticSaved = localStorage.getItem("static_campaign_overrides");
      const overrides = staticSaved ? JSON.parse(staticSaved) : {};
      
      const updatedCampaign = allCampaigns.find(c => c.id === updatedId);
      if (updatedCampaign) {
        overrides[updatedId] = {
          raisedAmount: updatedCampaign.raisedAmount,
          donors: updatedCampaign.donors,
          isAIVerified: updatedCampaign.isAIVerified,
          proofs: updatedCampaign.proofs?.filter((p: any) => !initialCampaigns.find(sc => sc.id === updatedId)?.proofs?.find((sp: any) => sp.id === p.id))
        };
        localStorage.setItem("static_campaign_overrides", JSON.stringify(overrides));
      }
    }
  };

  return (
    <DonationContext.Provider value={{ campaigns, donate, addCampaign, addProof }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};
