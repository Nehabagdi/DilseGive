import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDonation } from "@/context/DonationContext";
import jsPDF from "jspdf";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, ShieldCheck, ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Card Logo Components
const CardLogo = ({ type }: { type: string | null }) => {
  if (!type) return null;

  const logos: Record<string, JSX.Element> = {
    visa: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M18.15 31.75l2.84-14.45h4.55l-2.84 14.45h-4.55zm18.34-14.07c-.83-.34-2.14-.71-3.75-.71-4.14 0-7.05 2.15-7.07 5.22-.03 2.27 2.08 3.53 3.67 4.29 1.63.78 2.18 1.27 2.18 1.95 0 1.05-1.28 1.54-2.47 1.54-1.65 0-2.54-.25-3.89-.84l-.54-.26-.58 3.5c.96.43 2.73.81 4.57.83 4.4 0 7.25-2.12 7.29-5.4.03-1.79-1.1-3.14-3.51-4.26-1.46-.75-2.36-1.25-2.36-2.02 0-.69.78-1.42 2.45-1.42 1.39-.02 2.4.29 3.16.61l.38.18.42-3.21zm7.51.07h-3.51c-1.08 0-1.89.31-2.36 1.41l-6.66 12.97h4.78l.95-2.57h5.84l.55 2.57h4.21l-3.8-14.38zm-5.06 7.42l1.98-5.38 1.14 5.38h-3.12zm-28.76-7.42l-4.42 12.28-.47-2.37c-.81-2.71-2.98-5.63-5.59-6.95l-.1-.05 3.61 11.54h4.75l7.08-14.45h-4.86z" fill="#1A1F71" />
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="18" cy="24" r="14" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="30" cy="24" r="14" fill="#F79E1B" fillOpacity="0.8" />
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <rect width="48" height="48" rx="6" fill="#016FD0" />
        <path d="M12 20h3.5l1.5 4.5 1.5-4.5H22v10h-2.5v-6.5L17.5 27h-1l-2-3.5V30H12V20zm12 0h7.5v2.5H27v1h4v2.5h-4v1h4.5V30H24V20zm10.5 0h3l1.5 3 1.5-3h3l-3 5 3 5h-3l-1.5-3-1.5 3h-3l3-5-3-5z" fill="white" />
      </svg>
    ),
    rupay: (
      <div className="flex items-center text-[10px] font-black text-blue-800 italic bg-white px-1 rounded border border-blue-200">
        RuPay
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute right-4 top-1/2 -translate-y-1/2"
    >
      {logos[type]}
    </motion.div>
  );
};

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate } = useDonation();

  const campaign = state?.campaign;
  const [amount, setAmount] = useState(state?.amount || 1000);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Payment, 2: Success

  const generateReceipt = (data: any) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica");

    // HEADER BAR
    doc.setFillColor(15, 23, 42); // #0f172a
    doc.rect(0, 0, 210, 25, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.text("DilSeGive Donation Receipt", 105, 16, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");

    // CARD BACKGROUND
    doc.setDrawColor(226, 232, 240);
    doc.rect(10, 35, 190, 140);
    
    // TOP INFO
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Receipt ID: DSG-${data.id || Date.now()}`, 15, 45);
    doc.text(`Date: ${data.date}`, 195, 45, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.line(15, 50, 195, 50);

    // DONOR SECTION
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.text("Donor Details", 15, 60);
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(`Name: ${data.name}`, 15, 70);

    doc.line(15, 80, 195, 80);

    // DONATION SECTION
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.text("Donation Details", 15, 90);
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(`Campaign: ${data.campaign}`, 15, 100);
    doc.text(`Amount: INR ${data.amount}`, 15, 110);
    doc.text(`Frequency: One-time Contribution`, 15, 120);

    doc.line(15, 130, 195, 130);

    // MESSAGE BOX
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 135, 180, 25, "F");
    doc.setFontSize(10);
    doc.setFont("Helvetica", "italic");
    doc.setTextColor(71, 85, 105);
    doc.text("Thank you for your generous contribution. Your support creates real impact that", 105, 146, { align: "center" });
    doc.text("transforms lives and builds a better tomorrow for those in need.", 105, 153, { align: "center" });

    // FOOTER
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("This is a system-generated receipt by DilSeGive. No signature required.", 105, 172, { align: "center" });
    doc.text("Verified by Blockchain & AI Transparency Protocols", 105, 185, { align: "center" });

    doc.save(`DSG_Receipt_${Date.now()}.pdf`);
  };

  const generateCertificate = (data: any) => {
    const doc = new jsPDF("l", "mm", "a4");
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    doc.setFont("Helvetica");

    // BACKGROUND
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, width, height, "F");

    // OUTER BORDER
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, width - 20, height - 20);

    // INNER BORDER
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, width - 26, height - 26);

    // CONTENT
    doc.setFontSize(30);
    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.text("CERTIFICATE OF DONATION", width / 2, 45, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("This certificate is proudly presented to", width / 2, 65, { align: "center" });

    doc.setFontSize(32);
    doc.setTextColor(56, 189, 248); // #38bdf8
    doc.setFont("Helvetica", "bold");
    doc.text(data.name.toUpperCase(), width / 2, 85, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`For contributing INR ${data.amount} to`, width / 2, 110, { align: "center" });
    
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.text(`"${data.campaign}"`, width / 2, 125, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`On ${data.date}`, width / 2, 145, { align: "center" });

    // BRANDING
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.text("DilSeGive", width / 2, 178, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("Helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("Giving from the heart", width / 2, 185, { align: "center" });

    doc.save(`DSG_Certificate_${Date.now()}.pdf`);
  };

  // Form State
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardType, setCardType] = useState<string | null>(null);

  // Validation State
  const [validation, setValidation] = useState({
    cardNumber: true,
    expiry: true,
    cvc: true
  });

  // Refs for auto-focus
  const expiryMonthRef = useRef<HTMLButtonElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Detect Card Type
    const sanitized = cardNumber.replace(/\D/g, "");
    if (/^4/.test(sanitized)) setCardType("visa");
    else if (/^5[1-5]/.test(sanitized)) setCardType("mastercard");
    else if (/^3[47]/.test(sanitized)) setCardType("amex");
    else if (/^(60|65)/.test(sanitized)) setCardType("rupay");
    else setCardType(null);

    // Smart Validation for border color
    setValidation(prev => ({
      ...prev,
      cardNumber: sanitized.length === 0 || sanitized.length >= 15,
      cvc: cvc.length === 0 || (cvc.length >= 3 && cvc.length <= 4)
    }));

    // Auto-focus logic
    if (sanitized.length === 16 && cardType !== "amex") {
      expiryMonthRef.current?.focus();
    } else if (sanitized.length === 15 && cardType === "amex") {
      expiryMonthRef.current?.focus();
    }
  }, [cardNumber, cardType, cvc]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) setCvc(value);
  };

  const validateExpiry = () => {
    if (!expiryMonth || !expiryYear) return true;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const expMonth = parseInt(expiryMonth);
    const expYear = parseInt(expiryYear);

    if (expYear > currentYear) return true;
    if (expYear === currentYear && expMonth >= currentMonth) return true;
    return false;
  };

  useEffect(() => {
    setValidation(prev => ({
      ...prev,
      expiry: validateExpiry()
    }));
  }, [expiryMonth, expiryYear]);

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Invalid Payment Request</h2>
        <p className="text-muted-foreground">Please select a campaign from the browse page to make a donation.</p>
        <Button variant="outline" onClick={() => navigate("/campaigns")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation check
    const isCardValid = cardNumber.replace(/\D/g, "").length >= 15;
    const isExpiryValid = validateExpiry();
    const isCvcValid = cvc.length >= 3;

    if (!isCardValid || !isExpiryValid || !isCvcValid) {
      setValidation({
        cardNumber: isCardValid,
        expiry: isExpiryValid,
        cvc: isCvcValid
      });
      toast.error("Please correct the errors in your payment details.");
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const newDonation = {
        id: Date.now(),
        donorName: name,   // Cardholder name captured here
        amount: Number(amount),
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
      };

      const existing = JSON.parse(localStorage.getItem("donations") || "[]");
      const updatedDonations = [newDonation, ...existing];
      localStorage.setItem("donations", JSON.stringify(updatedDonations));
      console.log("Saved Donations:", updatedDonations);

      donate(campaign.id, Number(amount));
      setLoading(false);
      setStep(2);
      toast.success("Payment Successful! Thank you for your donation.");
    }, 2000);
  };

  if (step === 2) {
    const dateStr = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const donorName = name || "Anonymous Donor";

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h1 className="text-4xl font-black mb-4">Donation Successful!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for contributing <span className="text-primary font-bold">₹{amount.toLocaleString("en-IN")}</span> to <span className="font-semibold text-card-foreground">"{campaign.title}"</span>.
            </p>
            
            <div className="glass-card p-6 rounded-2xl mb-10 text-left bg-primary/5 border-primary/20">
              <p className="text-sm text-muted-foreground mb-2 italic">
                "Your contribution will directly impact the lives of those supported by {campaign.ngoName}. A receipt and certificate are available for download below."
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="gradient" className="flex-1" onClick={() => navigate("/campaigns")}>
                  View More Campaigns
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate("/")}>
                   Back to Home
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 border-t border-border/50">
                <Button variant="secondary" className="flex-1 gap-2" onClick={() => generateReceipt({
                  name: donorName,
                  amount: amount.toLocaleString("en-IN"),
                  campaign: campaign.title,
                  date: dateStr
                })}>
                  Download Receipt
                </Button>
                <Button variant="secondary" className="flex-1 gap-2" onClick={() => generateCertificate({
                  name: donorName,
                  amount: amount.toLocaleString("en-IN"),
                  campaign: campaign.title,
                  date: dateStr
                })}>
                  Download Certificate
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const years = Array.from({ length: 14 }, (_, i) => (2027 + i).toString());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  You are donating to
                </span>
                <h1 className="text-3xl font-black mb-4">{campaign.title}</h1>
                <p className="text-muted-foreground">{campaign.description}</p>
              </div>

              <div className="glass-card p-6 rounded-3xl border-white/5 bg-secondary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                    <img src={campaign.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{campaign.ngoName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      Verified NGO
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Donation Amount</span>
                    <span className="font-semibold font-mono">₹{amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="text-green-500 font-medium">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4">
                    <span>Total</span>
                    <span className="gradient-text font-mono">₹{amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/10 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your donation is eligible for tax exemption under Section 80G of the Income Tax Act.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Payment Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/10 bg-card/40 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-8">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Secure Payment</h2>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Custom Amount (₹)</Label>
                  <Input 
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="h-14 text-xl font-black font-mono border-white/10 focus:ring-primary/20 bg-secondary/30"
                    placeholder="Enter amount"
                    required
                    min="100"
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input 
                      id="card-name" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      className="bg-secondary/30" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input 
                        id="card-number" 
                        placeholder="**** **** **** ****" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required 
                        className={`bg-secondary/30 pr-12 transition-colors ${!validation.cardNumber ? 'border-red-500/50 focus:border-red-500' : ''}`} 
                      />
                      <AnimatePresence mode="wait">
                        {cardType ? (
                          <CardLogo key={cardType} type={cardType} />
                        ) : (
                          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select 
                          value={expiryMonth} 
                          onValueChange={(val) => {
                            setExpiryMonth(val);
                            if (val) cvcRef.current?.focus();
                          }}
                        >
                          <SelectTrigger 
                            ref={expiryMonthRef}
                            className={`bg-secondary/30 border-white/10 ${!validation.expiry ? 'border-red-500/50' : ''}`}
                          >
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map(m => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={expiryYear} onValueChange={setExpiryYear}>
                          <SelectTrigger className={`bg-secondary/30 border-white/10 ${!validation.expiry ? 'border-red-500/50' : ''}`}>
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map(y => (
                              <SelectItem key={y} value={y}>{y.slice(-2)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        ref={cvcRef}
                        placeholder="***" 
                        value={cvc}
                        onChange={handleCvcChange}
                        required 
                        className={`bg-secondary/30 transition-colors ${!validation.cvc ? 'border-red-500/50 focus:border-red-500' : ''}`} 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    variant="gradient" 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Securely...
                      </span>
                    ) : (
                      `Complete Donation of ₹${amount.toLocaleString("en-IN")}`
                    )}
                  </Button>
                  <div className="space-y-2 mt-4">
                    <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" />
                      Encrypted with AES-256 Bit Security
                    </p>
                    <p className="text-center text-[11px] text-muted-foreground font-medium flex items-center justify-center gap-1">
                      <span>🔒</span> Secured by 256-bit encryption
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
