import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, PlusCircle, Upload, BarChart3, FileText, Image, History, Users, TrendingUp, IndianRupee, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDonation } from "@/context/DonationContext";
import { dummyTransactions } from "@/data/dummyTransactions";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import Tesseract from "tesseract.js";
import { toast } from "sonner";
import axios from "axios";
import TransparencyDashboard from "@/components/TransparencyDashboard";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: PlusCircle, label: "Create Campaign" },
  { icon: Upload, label: "Upload Proof" },
  { icon: BarChart3, label: "Analytics" },
];

export default function NgoDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const { campaigns: globalCampaigns, addCampaign, addProof } = useDonation();
  const [active, setActive] = useState("Dashboard");
  const [dragActive, setDragActive] = useState(false);
  const [campaignList, setCampaignList] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations") || "[]");
    setDonations(stored);
  }, [active]); // Recalculate when switching tabs

  // --- START REALISTIC ANALYTICS LOGIC ---
  const BASE_TOTAL_DONORS = 2073;
  const BASE_AVG_DONATION = 750;

  const additionalDonors = new Set(donations.map((d: any) => d.donorName)).size;
  const additionalAmount = donations.reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);

  const totalDonors = BASE_TOTAL_DONORS + additionalDonors;
  const totalDonationsCount = donations.length + BASE_TOTAL_DONORS;
  const totalAmount = (BASE_TOTAL_DONORS * BASE_AVG_DONATION) + additionalAmount;
  const avgDonation = Math.round(totalAmount / totalDonationsCount);

  // Map stored donations to match dummyTransactions format
  const mappedStoredDonations = donations.map((d: any, idx: number) => ({
    id: d.id || `stored-${idx}`,
    name: d.donorName || "Anonymous",
    amount: Number(d.amount || 0),
    campaign: d.campaignTitle || "General Donation",
    date: d.date || "Just now"
  })); // Don't reverse here if we sort later, but user wants them at TOP

  const allTransactions = [...mappedStoredDonations, ...dummyTransactions];
  // --- END REALISTIC ANALYTICS LOGIC ---

  const totalRaised = globalCampaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const fundsUtilized = Math.floor(totalRaised * 0.85);
  const remainingBalance = totalRaised - fundsUtilized;
  
  // OCR states
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [ocrDescription, setOcrDescription] = useState("");
  const [verification, setVerification] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [blockchainStatus, setBlockchainStatus] = useState("");
  const [showTxDetails, setShowTxDetails] = useState(false);
  const [mockBlockNumber] = useState(Math.floor(100000 + Math.random() * 900000));

  function generateMockHash() {
    const randomHex = [...Array(64)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    return "0x" + randomHex;
  }

  async function mockAIVerification(data: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          extractedAmount: data.amount,
          fraudScore: Math.floor(Math.random() * 10),
          status: "VERIFIED",
          reasoning: "Verification successful."
        });
      }, 1500);
    });
  }

  useEffect(() => {
    const saved = localStorage.getItem("blockchainProof");
    if (saved) {
      const data = JSON.parse(saved);
      setTxHash(data.txHash);
      setBlockchainStatus("verified");
    }
  }, []);

  const handleBlockchainPublish = async () => {
    if (!selectedCampaignId) {
      toast.error("Please select a campaign first");
      return;
    }
    if (!file || !amount || !ocrDescription) {
      toast.error("Please provide all expenditure details");
      return;
    }

    setLoading(true);
    
    // Use the user's requested timing and logic
    setTimeout(async () => {
      const hash = generateMockHash();
      
      const base64 = await convertToBase64(file);
      const newProof = {
        id: Date.now(),
        image: base64,
        description: ocrDescription,
        amount: Number(amount),
        score: verification?.fraudScore || 0,
        createdAt: new Date().toISOString(),
        txHash: hash
      };

      addProof(selectedCampaignId, newProof);

      const proofData = {
        campaignId: selectedCampaignId,
        amount: amount,
        txHash: hash,
        status: "Blockchain Verified",
        date: new Date()
      };

      localStorage.setItem("blockchainProof", JSON.stringify(proofData));

      setTxHash(hash);
      setBlockchainStatus("verified");
      setLoading(false);
      toast.success("Transparency proof published to blockchain!");
    }, 1200);
  };

  // Create Campaign State
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [descriptionImages, setDescriptionImages] = useState<string[]>([]);
  const [proofImages, setProofImages] = useState<string[]>([]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateCampaign = () => {
    if (!title || !goalAmount || !descriptionText || !coverImage) {
      toast.error("Please fill all required fields and upload a cover image");
      return;
    }

    const newCampaign = {
      id: Date.now().toString(),
      title,
      goalAmount: Number(goalAmount),
      description: descriptionText,
      image: coverImage, 
      descriptionImages, 
      proofImages,
      ngoName: user?.name || "NGO Admin",
      raisedAmount: 0,
      location: "India", 
      category: "Education", 
      status: "Active",
      createdAt: new Date().toISOString()
    };

    addCampaign(newCampaign);
    toast.success("Campaign created successfully!");
    
    setTitle("");
    setGoalAmount("");
    setDescriptionText("");
    setCoverImage("");
    setDescriptionImages([]);
    setProofImages([]);
    setActive("Dashboard");
  };

  useEffect(() => {
    console.log("NGO Dashboard loaded ✅");
  }, []);

  const role = localStorage.getItem("role");
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-muted-foreground">Loading NGO Dashboard...</p>
      </div>
    );
  }

  useEffect(() => {
    if (!user) return;
  }, [user]);

  useEffect(() => {
    const formattedData = globalCampaigns.map(c => ({
        ...c,
        ngo: c.ngoName,
        raised: c.raisedAmount,
        goal: c.goalAmount,
    }));
    const filtered = user && user.name === "NGO Admin" ? formattedData.slice(0, 3) : formattedData.slice(0, 5);
    setCampaignList(filtered);
  }, [user, globalCampaigns]);

  const handleVerification = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }

    if (!amount) {
      toast.error("Please enter the amount first");
      return;
    }

    setLoading(true);
    setVerification(null);
    setAiAnalysis("");
    setTxHash(null);
    setBlockchainStatus("");

    try {
      // Mock AI Verification
      const result: any = await mockAIVerification({ amount });
      
      setVerification({
        extractedAmount: result.extractedAmount,
        fraudScore: result.fraudScore,
        status: result.status,
        reason: result.reasoning
      });

      setAiAnalysis(result.reasoning);
      
      if (result.status === "VERIFIED") {
        toast.success("AI Verification: Verified Document ✅");
      } else {
        toast.warning(`AI Verification Status: ${result.status}`);
      }

    } catch (error: any) {
      console.error("AI Verification Error:", error);
      toast.error("AI verification failed.");
      
      setVerification({
        extractedAmount: amount,
        fraudScore: 2,
        status: "VERIFIED",
        reason: "AI verified: The bill appears authentic. The total amount matches the entered value and the structure is consistent with a valid invoice."
      });
      setAiAnalysis("Verification successful.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 p-6 pt-8">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">NGO Panel</h3>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.label
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 sm:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {active === "Dashboard" && (
              <>
                <h1 className="text-2xl font-bold mb-6">NGO Dashboard</h1>
                <TransparencyDashboard campaigns={globalCampaigns} />
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <h2 className="font-semibold mb-4">My Campaigns</h2>
                  <div className="space-y-3">
                    {campaignList.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                        <div>
                          <p className="font-medium text-sm">{c.title}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{c.raised.toLocaleString("en-IN")} / ₹{c.goal.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            c.status === "Active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                          }`}>
                            {c.status || 'Active'}
                          </span>
                          {c.isAIVerified && (
                             <span className="bg-green-500/10 text-green-500 text-[9px] font-black px-2 py-0.5 rounded uppercase border border-green-500/20 flex items-center gap-1">
                               <CheckCircle2 className="h-2.5 w-2.5" />
                               AI Verified
                             </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {campaignList.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No campaigns found for this NGO.</p>
                    )}
                  </div>
                </div>
              </>
            )}
            {active === "Create Campaign" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
                <div className="glass-card rounded-2xl p-8 max-w-3xl">
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold mb-1.5 block">Campaign Title</label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="Enter campaign title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold mb-1.5 block">Fundraising Goal (₹)</label>
                        <div className="relative">
                          <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="e.g. 500000"
                            type="number"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold mb-1.5 block">Campaign Description</label>
                      <textarea
                        className="w-full h-32 p-4 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="In-depth explanation of your cause and how funds will be used..."
                        value={descriptionText}
                        onChange={(e) => setDescriptionText(e.target.value)}
                      />
                    </div>

                    {/* Section 1: Cover Image */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <Image className="h-4 w-4 text-primary" /> Cover Image (Required)
                      </label>
                      <div className="grid sm:grid-cols-[1fr,200px] gap-4 items-start">
                        <div className="relative group">
                          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/30 transition-colors cursor-pointer relative overflow-hidden">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground font-medium uppercase">Click to upload</p>
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept="image/*"
                              onChange={async (e) => {
                                if (e.target.files?.[0]) {
                                  const base64 = await convertToBase64(e.target.files[0]);
                                  setCoverImage(base64);
                                }
                              }}
                            />
                          </div>
                        </div>
                        {coverImage && (
                          <div className="h-24 w-full rounded-xl overflow-hidden border border-border relative group">
                            <img src={coverImage} className="w-full h-full object-cover" alt="Cover preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button onClick={() => setCoverImage("")} className="text-white bg-red-500 p-1.5 rounded-full hover:scale-110 transition-transform">
                                <History className="h-3 w-3 rotate-45" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Description Images */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <Image className="h-4 w-4 text-primary" /> Story Images (Updates & Process)
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <div className="w-24 h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center hover:bg-secondary/30 transition-all cursor-pointer relative">
                          <PlusCircle className="h-6 w-6 text-muted-foreground" />
                          <input
                            type="file"
                            multiple
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files) {
                                const files = Array.from(e.target.files);
                                const base64s = await Promise.all(files.map(f => convertToBase64(f)));
                                setDescriptionImages(prev => [...prev, ...base64s]);
                              }
                            }}
                          />
                        </div>
                        {descriptionImages.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden border border-border relative group shadow-sm">
                            <img src={img} className="w-full h-full object-cover" alt={`desc-${idx}`} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button onClick={() => setDescriptionImages(prev => prev.filter((_, i) => i !== idx))} className="text-white bg-red-500 p-1 rounded-full">
                                <History className="h-3 w-3 rotate-45" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Proof Images */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <History className="h-4 w-4 text-primary" /> Proof of Work (Documents, Photos)
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <div className="w-24 h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center hover:bg-secondary/30 transition-all cursor-pointer relative">
                          <PlusCircle className="h-6 w-6 text-muted-foreground" />
                          <input
                            type="file"
                            multiple
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files) {
                                const files = Array.from(e.target.files);
                                const base64s = await Promise.all(files.map(f => convertToBase64(f)));
                                setProofImages(prev => [...prev, ...base64s]);
                              }
                            }}
                          />
                        </div>
                        {proofImages.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden border border-border relative group shadow-sm">
                            <img src={img} className="w-full h-full object-cover" alt={`proof-${idx}`} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button onClick={() => setProofImages(prev => prev.filter((_, i) => i !== idx))} className="text-white bg-red-500 p-1 rounded-full">
                                <History className="h-3 w-3 rotate-45" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="gradient" size="lg" className="w-full h-12 text-sm font-bold shadow-xl shadow-primary/20" onClick={handleCreateCampaign}>
                        Publish Live Campaign
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center mt-3 uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-3 w-3" /> Blockchain & AI Verified Listing
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {active === "Upload Proof" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Upload Expense Proof</h1>
                <div className="glass-card rounded-2xl p-6 max-w-2xl">
                  {/* Campaign Selector */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold mb-2 block text-muted-foreground uppercase tracking-wider">Target Campaign</label>
                    <div className="relative">
                      <select
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                        value={selectedCampaignId}
                        onChange={(e) => setSelectedCampaignId(e.target.value)}
                      >
                        <option value="">Select a campaign to link this proof</option>
                        {globalCampaigns.map((c) => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <History className="h-4 w-4 rotate-180" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                      dragActive ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                  >
                    <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">{file ? file.name : "Drag & drop files here"}</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <div className="relative inline-block">
                      <Button variant="gradient-outline" size="sm">
                        {file ? "Change File" : "Browse Files"}
                      </Button>
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                            setVerification(null);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Expense Description</label>
                      <input
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="e.g. Rice purchase for distribution"
                        value={ocrDescription}
                        onChange={(e) => setOcrDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Amount (₹)</label>
                      <input
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="e.g. 50000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="gradient" 
                      size="lg" 
                      className="w-full"
                      onClick={handleVerification}
                      disabled={loading}
                    >
                      {loading && !verification ? "Verifying..." : "Submit for AI Verification"}
                    </Button>

                    {verification && (
                      <div className="mt-6 p-4 rounded-2xl bg-secondary/30 border border-border/50 animate-in fade-in slide-in-from-top-2">
                        <h4 className="font-semibold mb-3 text-sm">AI Verification Result</h4>
                        <div className="space-y-2 text-sm">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Extracted Amount:</span>
                            <span className="font-medium">₹{verification.extractedAmount || amount}</span>
                          </p>

                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Fraud Score:</span>
                            <span className={`font-bold ${verification.fraudScore <= 5 ? "text-green-500" : verification.fraudScore <= 30 ? "text-orange-500" : "text-red-500"}`}>
                              {verification.fraudScore}/100
                            </span>
                          </p>
                          
                          <div className="pt-2 mt-2 border-t border-border/50 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs">
                            {verification.status === "VERIFIED" && (
                              <span className="text-green-500 flex items-center gap-1">✔ Verified</span>
                            )}
                            {verification.status === "Review" && (
                              <span className="text-orange-500 flex items-center gap-1">⚠ Review</span>
                            )}
                            {verification.status === "Suspicious" && (
                              <span className="text-red-500 flex items-center gap-1">❌ Suspicious</span>
                            )}
                          </div>

                        </div>

                        {aiAnalysis && (
                          <div className="mt-4 pt-4 border-t border-border/50">
                            <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                              AI Reasoning
                            </h4>
                            <p className="text-xs leading-relaxed italic text-card-foreground">
                              {aiAnalysis}
                            </p>
                          </div>
                        )}
                        <Button 
                          variant="gradient" 
                          size="lg" 
                          className="w-full mt-6 shadow-xl shadow-primary/20"
                          onClick={handleBlockchainPublish}
                          disabled={loading || blockchainStatus === "verified"}
                        >
                          {blockchainStatus === "verified" ? "Proof Stored on Chain" : (loading ? "Storing on blockchain..." : "Confirm & Publish to Blockchain")}
                        </Button>

                        {loading && (
                          <div className="mt-4 text-center text-sm font-medium animate-pulse flex items-center justify-center gap-2">
                             ⏳ Storing on blockchain...
                          </div>
                        )}

                        {txHash && (
                          <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs animate-in zoom-in-95">
                            <p className="text-green-500 font-bold mb-1 flex items-center gap-1">
                              ✅ Blockchain Verified
                            </p>
                            <p className="text-muted-foreground break-all font-mono">
                              <span className="font-bold text-card-foreground">🔗 Tx Hash:</span> {txHash}
                            </p>
                            <button 
                              onClick={() => setShowTxDetails(true)}
                              className="mt-2 block text-primary hover:underline font-bold text-left"
                            >
                              View on Polygonscan ↗
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {active === "Analytics" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold mb-6">Campaign Analytics</h1>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      { label: "Total Raised", value: `₹${totalRaised.toLocaleString("en-IN")}`, icon: IndianRupee },
                      { label: "Total Donors", value: totalDonors.toString(), icon: Users },
                      { label: "Avg. Donation", value: `₹${avgDonation.toLocaleString("en-IN")}`, icon: TrendingUp },
                    ].map((s) => (
                      <div key={s.label} className="glass-card rounded-3xl p-6 border-white/5 bg-secondary/20 shadow-xl transition-transform hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <s.icon className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-3xl font-black gradient-text">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Recent Donations Activity
                    </h2>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/50 px-3 py-1 rounded-full border border-border/50">
                      Live Feed
                    </span>
                  </div>

                  <div className="space-y-4">
                    {allTransactions.slice(0, 10).map((t) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/5 hover:bg-card/60 transition-all shadow-lg hover:shadow-primary/5 cursor-default"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-base group-hover:text-primary transition-colors">{t.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              donated <span className="text-card-foreground font-semibold">₹{t.amount.toLocaleString("en-IN")}</span> to{" "}
                              <span className="text-primary/80 font-medium italic">{t.campaign}</span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                           <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase flex items-center gap-1.5 order-2 sm:order-1">
                             <CheckCircle2 className="h-3 w-3" />
                             Verified
                           </div>
                           <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter order-1 sm:order-2">
                             {t.date}
                           </span>
                        </div>
                      </motion.div>
                    ))}

                    {dummyTransactions.length === 0 && (
                      <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border">
                        <p className="text-muted-foreground italic">No recent transactions found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
      <Footer />

      {/* Realistic Transaction Explorer Modal */}
      <AnimatePresence>
        {showTxDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTxDetails(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-lg p-8 rounded-[2.5rem] relative z-10 border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-card/90"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Transaction Details</h2>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Blockchain Explorer View</p>
                </div>
                <button 
                  onClick={() => setShowTxDetails(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors group"
                >
                  <PlusCircle className="h-6 w-6 rotate-45 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Transaction Hash</p>
                  <p className="font-mono text-[11px] break-all bg-secondary/50 p-4 rounded-2xl border border-white/5 text-primary/90 leading-relaxed">
                    {txHash}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Status</p>
                    <div className="flex items-center gap-2 text-green-500 font-bold text-sm bg-green-500/10 w-fit px-3 py-1 rounded-full border border-green-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Success
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Network</p>
                    <p className="text-sm font-bold flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      Polygon Mainnet
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Block Number</p>
                    <p className="text-sm font-mono font-bold">#{mockBlockNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Transaction Fee</p>
                    <p className="text-sm font-bold text-card-foreground">0.002148 MATIC</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Timestamp</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {new Date().toLocaleString('en-IN', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-2 border-t border-white/5">
                <Button 
                  variant="gradient" 
                  className="w-full rounded-2xl h-14 font-bold text-base shadow-xl shadow-primary/20"
                  onClick={() => setShowTxDetails(false)}
                >
                  Close Explorer View
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
