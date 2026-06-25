import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { LayoutDashboard, Heart, FileBarChart, User } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/donor-dashboard" },
  { icon: Heart, label: "My Donations", path: "/donor-dashboard/donations" },
  { icon: FileBarChart, label: "Impact Reports", path: "/donor-dashboard/reports" },
  { icon: User, label: "Profile", path: "/donor-dashboard/profile" },
];

export default function DonorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Donor Dashboard loaded ✅");
  }, []);

  const role = localStorage.getItem("role");
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-muted-foreground">Loading Donor Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 p-6 pt-8">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">Donor Panel</h3>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === item.path
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
            <h1 className="text-2xl font-bold mb-6">Welcome back, Donor! 👋</h1>
            
            {/* The individual tab content will render here */}
            <Outlet />
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
