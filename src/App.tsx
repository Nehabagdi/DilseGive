import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Transparency from "./pages/Transparency";
import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentPage from "./pages/PaymentPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DonorSummary } from "./components/donor/DonorSummary";
import { DonationList } from "./components/donor/DonationList";
import { ImpactReports } from "./components/donor/ImpactReports";
import { DonorProfile } from "./components/donor/DonorProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/donor-dashboard" 
            element={
              <ProtectedRoute role="donor">
                <DonorDashboard />
              </ProtectedRoute>
            } 
          >
            <Route index element={<DonorSummary />} />
            <Route path="donations" element={<DonationList />} />
            <Route path="reports" element={<ImpactReports />} />
            <Route path="profile" element={<DonorProfile />} />
          </Route>
          
          {/* Fallback for old/wrong paths */}
          <Route path="/donor" element={<Navigate to="/donor-dashboard" replace />} />
          <Route path="/ngo" element={<Navigate to="/ngo-dashboard" replace />} />

          <Route 
            path="/ngo-dashboard" 
            element={
              <ProtectedRoute role="ngo">
                <NgoDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const DashboardRedirect = () => {
  const role = localStorage.getItem("role");
  console.log("ROLE:", role);

  if (role === null) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return <Navigate to="/" replace />;
    return <p className="p-8 text-center animate-pulse">Loading dashboard...</p>;
  }
  
  if (role === "ngo") return <Navigate to="/ngo-dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "donor") return <Navigate to="/donor-dashboard" replace />;
  
  return <Navigate to="/" replace />;
};

export default App;
