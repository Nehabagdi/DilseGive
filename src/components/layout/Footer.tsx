import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Campaigns", to: "/campaigns" },
  { label: "Transparency", to: "/transparency" },
  { label: "Donor Dashboard", to: "/donor" },
  { label: "NGO Dashboard", to: "/ngo" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <span className="gradient-text">dilsegive</span>
              <Heart className="h-5 w-5 text-destructive fill-destructive" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered donation transparency. Every rupee tracked, verified, and accounted for.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contact@dilsegive.org</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 dilsegive. Built with ❤️ for transparent giving.
        </div>
      </div>
    </footer>
  );
}
