import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User as UserIcon, LogOut, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "../auth/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Campaigns", to: "/campaigns" },
  { label: "Transparency", to: "/transparency" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean, tab: 'login' | 'signup' }>({ open: false, tab: 'login' });
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/80 backdrop-blur-xl shadow-[var(--shadow-card)] border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="gradient-text">dilsegive</span>
          <Heart className="h-5 w-5 text-destructive fill-destructive" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes("dashboard") || location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors mr-2"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium flex items-center gap-2">
                <UserIcon className="h-4 w-4" /> {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="gradient-outline" size="sm" onClick={() => setAuthModal({ open: true, tab: 'login' })}>
                Login
              </Button>
              <Button variant="gradient" size="sm" onClick={() => setAuthModal({ open: true, tab: 'signup' })}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => {
                    console.log("Navigating to dashboard");
                    setMobileOpen(false);
                  }}
                  className={`text-sm font-medium py-2 ${
                    location.pathname.includes("dashboard") || location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex gap-3 pt-2">
                {user ? (
                  <Button variant="outline" size="sm" onClick={logout} className="flex-1 gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="gradient-outline" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); setAuthModal({ open: true, tab: 'login' }); }}>Login</Button>
                    <Button variant="gradient" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); setAuthModal({ open: true, tab: 'signup' }); }}>Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })} 
        defaultTab={authModal.tab}
      />
    </nav>
  );
}
