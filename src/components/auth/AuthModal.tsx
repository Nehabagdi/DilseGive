import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/data/users";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Donor'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const inputEmail = formData.email.trim().toLowerCase();
    const inputPassword = formData.password.trim();
    
    console.log("Login input:", inputEmail, inputPassword);
    
    try {
      // Exact matching as requested in step 1
      const user = users.find(
        u =>
          u.email.toLowerCase() === inputEmail &&
          u.password === inputPassword
      );
      console.log("Found user:", user);
      
      if (user) {
        login(user); // AuthContext will save to localStorage
        console.log("Stored user:", localStorage.getItem("user"));
        toast.success("Welcome back!");
        
        // Reset form as requested in step 2
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'Donor'
        });
        
        onClose();
        
        // Exact role checking
        if (user.role === "donor") {
          navigate("/donor-dashboard");
        } else if (user.role === "ngo") {
          navigate("/ngo-dashboard");
        } else if (user.role === "admin") {
          navigate("/admin");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Dummy signup
      const newUser = {
        id: Math.random().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase()
      };
      
      login(newUser);
      toast.success("Account created successfully!");
      onClose();

      // Exact role checking
      if (newUser.role === "donor") {
        navigate("/donor-dashboard");
      } else if (newUser.role === "ngo") {
        navigate("/ngo-dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] glass-card border-white/20 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            {defaultTab === 'login' ? 'Welcome Back' : 'Join DilSeGive'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  name="email" 
                  type="email" 
                  placeholder="donor@test.com" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  name="password" 
                  type="password" 
                  placeholder="123456"
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-secondary/50"
                />
              </div>
              <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  name="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label>I am a:</Label>
                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant={formData.role === 'Donor' ? 'gradient' : 'outline'} 
                    className="flex-1"
                    onClick={() => handleRoleChange('Donor')}
                  >
                    Donor
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.role === 'NGO' ? 'gradient' : 'outline'} 
                    className="flex-1"
                    onClick={() => handleRoleChange('NGO')}
                  >
                    NGO
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
