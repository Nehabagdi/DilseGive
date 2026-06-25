import { motion } from "framer-motion";
import { User, Mail, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export function DonorProfile() {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name || "John Doe"} className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue={user?.email || "john@example.com"} readOnly className="bg-secondary/20" />
                </div>
              </div>
              <Button variant="gradient" className="mt-2">Update Profile</Button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              {[
                { label: "Donation Updates", desc: "Get notified when your donation is utilized." },
                { label: "Quarterly Reports", desc: "Receive impact summaries every three months." },
                { label: "Newsletter", desc: "Stay updated with our latest initiatives." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-medium">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="h-6 w-11 bg-primary/20 rounded-full relative">
                    <div className="absolute right-1 top-1 h-4 w-4 bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold">{user?.name || "John Doe"}</h3>
            <p className="text-xs text-muted-foreground mb-4">Member since Feb 2026</p>
            <div className="flex justify-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
