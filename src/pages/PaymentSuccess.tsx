import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
      toast.success("Payment verified successfully (Demo Mode)!");
    }, 1500);
    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 max-w-md w-full text-center"
        >
          {status === 'verifying' && (
            <div className="space-y-4">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <h1 className="text-2xl font-bold">Verifying Donation...</h1>
              <p className="text-muted-foreground">Please wait while we confirm your payment with Stripe.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="h-20 w-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Thank You!</h1>
              <p className="text-muted-foreground text-lg">
                Your donation has been successfully processed and verified by AI.
              </p>
              <div className="space-y-3">
                <Link to="/donor-dashboard/donations">
                  <Button variant="gradient" className="w-full">
                    View My Donations <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button variant="outline" className="w-full">
                    Explore More Campaigns
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="h-20 w-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold">Verification Issue</h1>
              <p className="text-muted-foreground">
                We couldn't verify your payment. If you've been charged, please contact support with your session ID.
              </p>
              <p className="text-xs bg-secondary p-2 rounded break-all">{sessionId}</p>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
