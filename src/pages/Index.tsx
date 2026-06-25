import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrustBadge } from "@/components/TrustBadge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Bot, BarChart3, ShieldCheck, ArrowRight, IndianRupee, Users, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const features = [
  { icon: Bot, title: "AI Verification", desc: "Every expense is verified by AI to ensure authenticity and prevent misuse of funds.", color: "text-primary" },
  { icon: BarChart3, title: "Real-Time Transparency", desc: "Track every rupee in real-time with live dashboards and detailed breakdowns.", color: "text-accent" },
  { icon: ShieldCheck, title: "Fraud Detection", desc: "Advanced fraud detection algorithms protect your donations from misuse.", color: "text-cyan" },
];

const stats = [
  { value: 15200000, prefix: "₹", label: "Funds Raised", icon: IndianRupee },
  { value: 4800, label: "Donors", icon: Users },
  { value: 320, label: "Campaigns", icon: Heart },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="max-w-xl">
              <motion.div variants={fadeUp} custom={0} className="flex gap-2 mb-6">
                <TrustBadge type="verified" />
                <TrustBadge type="fraud" />
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Give with Trust.{" "}
                <span className="gradient-text">Track Every Rupee.</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                AI-powered transparency for every donation. Know exactly where your money goes and the impact it creates.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Link to="/campaigns">
                  <Button variant="gradient" size="xl">
                    Donate Now <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="glass-card rounded-3xl p-6 relative">
                <div className="absolute -top-3 -right-3 animate-pulse-glow rounded-full">
                  <TrustBadge type="verified" />
                </div>
                <h3 className="font-semibold mb-4">Live Transparency Dashboard</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Total Raised", value: "₹15.2L" },
                    { label: "Funds Used", value: "₹12.8L" },
                    { label: "Donors", value: "4,800" },
                    { label: "NGOs", value: "52" },
                  ].map((item) => (
                    <div key={item.label} className="bg-secondary/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-bold gradient-text">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-24 bg-secondary/30 rounded-xl flex items-end px-3 pb-2 gap-1">
                  {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 gradient-primary rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">
                  <AnimatedCounter end={s.value} prefix={s.prefix || ""} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="gradient-text">dilsegive</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
              Cutting-edge technology ensuring every donation makes a real impact.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card-hover rounded-2xl p-8 text-center"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
                  i === 0 ? "bg-primary/10" : i === 1 ? "bg-accent/10" : "bg-cyan/10"
                }`}>
                  <f.icon className={`h-7 w-7 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 relative z-10">
              Ready to make a difference?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 max-w-lg mx-auto mb-8 relative z-10">
              Join thousands of donors who trust dilsegive for transparent, impactful giving.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="relative z-10">
              <Link to="/campaigns">
                <Button size="xl" className="bg-card text-foreground hover:bg-card/90 rounded-xl font-semibold">
                  Start Donating <ArrowRight className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
