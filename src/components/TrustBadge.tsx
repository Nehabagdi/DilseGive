import { Shield, CheckCircle, Lock } from "lucide-react";

const badges = {
  verified: { icon: Shield, label: "AI Verified ✅", className: "bg-accent/10 text-accent border-accent/20" },
  trusted: { icon: CheckCircle, label: "Trusted NGO ✔", className: "bg-primary/10 text-primary border-primary/20" },
  fraud: { icon: Lock, label: "Fraud Checked 🔒", className: "bg-cyan/10 text-cyan border-cyan/20" },
};

interface TrustBadgeProps {
  type: keyof typeof badges;
  className?: string;
}

export function TrustBadge({ type, className = "" }: TrustBadgeProps) {
  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.className} ${className}`}>
      <Icon className="h-3 w-3" />
      {badge.label}
    </span>
  );
}
