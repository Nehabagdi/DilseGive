import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { Link, useNavigate } from "react-router-dom";
import { Users, CheckCircle2 } from "lucide-react";

interface CampaignCardProps {
  id: string;
  title: string;
  ngo: string;
  image: string;
  raised: number;
  goal: number;
  category: string;
  location: string;
  donors?: number;
  isAIVerified?: boolean;
}

export function CampaignCard({ id, title, ngo, image, raised, goal, category, location, donors = 282, isAIVerified }: CampaignCardProps) {
  const navigate = useNavigate();
  const progress = Math.min((raised / goal) * 100, 100);

  console.log("Campaign card data:", { id, title, ngo, image });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card-hover rounded-2xl overflow-hidden group h-full flex flex-col"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => {
            console.log("Image failed:", image);
            (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/300";
          }}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 pr-3">
          <TrustBadge type="verified" />
          <span className="bg-accent/80 backdrop-blur-md text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {category}
          </span>
          {isAIVerified && (
            <span className="bg-green-500/90 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg border border-white/20">
              <CheckCircle2 className="h-2.5 w-2.5" />
              AI Verified
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs text-muted-foreground">{ngo}</p>
          <p className="text-[10px] text-muted-foreground/80 font-medium">{location}</p>
        </div>
        <h3 className="font-semibold text-base mb-3 line-clamp-2">{title}</h3>

        <div className="mt-auto">
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium">₹{raised.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground">of ₹{goal.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center mt-1.5 px-0.5">
              <p className="text-[10px] font-bold text-primary">{Math.floor(progress)}% Funded</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <Users className="w-2.5 h-2.5" />
                {donors} Donors
              </div>
            </div>
          </div>

          <Link to={`/campaigns/${id}`}>
            <Button variant="gradient" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
