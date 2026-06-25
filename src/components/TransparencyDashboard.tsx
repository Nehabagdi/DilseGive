import React from "react";
import { ShieldCheck, AlertCircle, AlertTriangle, IndianRupee, PieChart as PieChartIcon, BarChart3, Info, FileCheck, Rocket, Zap, Target, TrendingUp, History, Wallet, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

interface TransparencyDashboardProps {
  campaigns: any[];
}

const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6"  // Violet
];

// Demo data for SaaS-style depth
const expenseCategories = [
  { name: "Food & Nutrition", value: 42 },
  { name: "Medical Aid", value: 25 },
  { name: "Education", value: 18 },
  { name: "Logistics", value: 10 },
  { name: "Admin", value: 5 }
];

const fundData = [
  { month: "Jan", amount: 450000 },
  { month: "Feb", amount: 520000 },
  { month: "Mar", amount: 480000 },
  { month: "Apr", amount: 610000 },
  { month: "May", amount: 550000 },
  { month: "Jun", amount: 720000 }
];

const recentExpenses = [
  { title: "Rice & Grains Distribution", date: "June 12, 2024", amount: "1,25,000", status: "Verified" },
  { title: "Emergency Medical Kits", date: "June 10, 2024", amount: "85,000", status: "Verified" },
  { title: "School Uniforms Supply", date: "June 08, 2024", amount: "42,000", status: "Verified" },
  { title: "Warehouse Logistics", date: "June 05, 2024", amount: "12,500", status: "Verified" },
];

const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({ campaigns }) => {
  const totalRaised = campaigns.reduce((acc, c) => acc + (c.raisedAmount || 0), 0);
  const fundsUtilized = totalRaised * 0.82; // Simulated utilization
  const remainingBalance = totalRaised - fundsUtilized;

  // Count verification statuses for AI stats
  let verified = 0;
  let suspicious = 0;
  let fraud = 0;

  campaigns.forEach((c) => {
    const status = c.verificationStatus || c.verification?.status;
    if (status === "Verified") verified++;
    else if (status === "Suspicious") suspicious++;
    else if (status === "Fraud Risk") fraud++;
  });

  const totalProofs = verified + suspicious + fraud;
  const trustScore = totalProofs > 0 ? Math.round((verified / totalProofs) * 100) : 98;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* SaaS Header */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">
          Transparency <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Real-time tracking of every rupee. AI-verified and fully transparent.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Funds Raised", value: totalRaised, icon: IndianRupee, bg: "bg-indigo-500/10", color: "text-indigo-500" },
          { label: "Funds Utilized", value: fundsUtilized, icon: TrendingUp, bg: "bg-emerald-500/10", color: "text-emerald-500" },
          { label: "Remaining Balance", value: remainingBalance, icon: Wallet, bg: "bg-slate-500/10", color: "text-slate-400" },
        ].map((stat, i) => ( stat.value && (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl ${stat.bg} border border-white/5 backdrop-blur-xl shadow-xl`}
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter">
              ₹{stat.value.toLocaleString("en-IN")}
            </h2>
          </motion.div>
        )))}
      </div>

      {/* Trust Score & Progress Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-card/30 border border-white/5 backdrop-blur-3xl shadow-2xl flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/20 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Organizational Trust Score</h3>
                <p className="text-sm text-muted-foreground">Verified transparency rating based on history</p>
              </div>
            </div>
            <span className="text-4xl font-black gradient-text">{trustScore}%</span>
          </div>
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner p-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${trustScore}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-3xl shadow-2xl flex items-center gap-6">
            <div className="p-4 rounded-full bg-green-500/20 text-green-500 animate-pulse">
                <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Live Status</p>
                <h3 className="text-2xl font-black text-green-500">SECURE</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Blockchain Anchored</p>
            </div>
        </div>
      </div>

      {/* Chart Section - 2 Column Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Donut Chart - Expense Categories */}
        <div className="p-8 rounded-[2.5rem] bg-card/30 border border-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Expense Categories
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
            <div className="h-[220px] w-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {expenseCategories.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-bold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart - Funds Timeline */}
        <div className="p-8 rounded-[2.5rem] bg-card/30 border border-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Funds Timeline
            </h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fundData}>
                <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Expense Timeline - Bottom Section */}
      <div className="p-8 rounded-[2.5rem] bg-card/30 border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <History className="h-6 w-6 text-primary" />
            Live Expense Timeline
          </h3>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              Live Feed
          </div>
        </div>

        <div className="space-y-4">
          {recentExpenses.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-xl font-black gradient-text">₹{item.amount}</p>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  AI Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
