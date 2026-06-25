import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrustBadge } from "@/components/TrustBadge";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Bot } from "lucide-react";

const pieData = [
  { name: "Food & Nutrition", value: 42, color: "hsl(239, 84%, 67%)" },
  { name: "Medical Aid", value: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Education", value: 18, color: "hsl(187, 92%, 43%)" },
  { name: "Logistics", value: 10, color: "hsl(45, 93%, 47%)" },
  { name: "Admin", value: 5, color: "hsl(0, 0%, 75%)" },
];

const lineData = [
  { month: "Jan", amount: 120000 },
  { month: "Feb", amount: 280000 },
  { month: "Mar", amount: 450000 },
  { month: "Apr", amount: 620000 },
  { month: "May", amount: 890000 },
  { month: "Jun", amount: 1100000 },
];

const expenses = [
  { item: "Rice & Grains Purchase", amount: "₹3,20,000", date: "Mar 15, 2026", verified: true },
  { item: "Medical Supplies – Batch A", amount: "₹1,80,000", date: "Mar 22, 2026", verified: true },
  { item: "School Kits (500 units)", amount: "₹95,000", date: "Apr 1, 2026", verified: true },
  { item: "Transport to Ahmednagar", amount: "₹45,000", date: "Apr 3, 2026", verified: true },
];

const topCards = [
  { label: "Total Funds Raised", value: 15200000, prefix: "₹", color: "from-primary/10 to-primary/5" },
  { label: "Funds Utilized", value: 12800000, prefix: "₹", color: "from-accent/10 to-accent/5" },
  { label: "Remaining Balance", value: 2400000, prefix: "₹", color: "from-cyan/10 to-cyan/5" },
];

export default function Transparency() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Transparency <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Real-time tracking of every rupee. AI-verified and fully transparent.
            </p>
          </motion.div>

          {/* Top cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {topCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${card.color}`}
              >
                <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                <p className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter end={card.value} prefix={card.prefix} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Expense Categories</h3>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2">
                  {pieData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name}</span>
                      <span className="font-medium ml-auto">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Funds Timeline</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                  <Line type="monotone" dataKey="amount" stroke="hsl(239, 84%, 67%)" strokeWidth={3} dot={{ fill: "hsl(239, 84%, 67%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Expense Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <h3 className="font-semibold mb-4">Expense Timeline</h3>
            <div className="space-y-3">
              {expenses.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      📄
                    </div>
                    <div>
                      <p className="text-sm font-medium">{e.item}</p>
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{e.amount}</span>
                    <TrustBadge type="verified" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 border-l-4 border-primary"
          >
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI-Generated Impact Summary</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your donations have helped provide nutritious food to <strong>320 families</strong> across 5 villages in Maharashtra, 
              supported <strong>medical aid for 150+ patients</strong>, and funded <strong>education kits for 500 children</strong>. 
              All expenses have been AI-verified with 100% accuracy. The remaining ₹24,00,000 is earmarked for upcoming distribution 
              drives in Ahmednagar and Solapur districts, scheduled for April 2026.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
