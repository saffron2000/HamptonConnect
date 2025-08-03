import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle, Bolt } from "lucide-react";

export default function Portal() {
  const { user, isLoading, login, logout, isAuthenticated } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(loginData.email, loginData.password);
  };

  const handleLogout = () => {
    logout();
    setLoginData({ email: "", password: "" });
  };

  if (isAuthenticated && user) {
    return (
      <section className="py-20 min-h-screen bg-gradient-to-br from-columbia-blue to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Welcome to the Portal
          </h1>
          
          <Card className="shadow-lg">
            <CardContent className="p-12">
              <Bolt className="text-6xl text-gray-400 mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Exclusive tools, perks, and resources for CFC members.
              </p>
              <div className="text-left max-w-2xl mx-auto space-y-3 text-gray-700 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 w-5 h-5" />
                  <span>Member directory and networking tools</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 w-5 h-5" />
                  <span>Exclusive content and founder resources</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 w-5 h-5" />
                  <span>Event registration and calendar sync</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 w-5 h-5" />
                  <span>Partner discounts and vendor database</span>
                </div>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen bg-gradient-to-br from-columbia-blue to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Member Portal
          </h1>
          <p className="text-xl text-gray-700">Access exclusive resources and community tools.</p>
        </div>
        
        <Card className="shadow-lg max-w-md mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="loginEmail" className="text-sm font-semibold text-navy-blue">
                  Email
                </Label>
                <Input
                  type="email"
                  id="loginEmail"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="mt-2"
                  placeholder="member@columbiafounders.com"
                />
              </div>
              
              <div>
                <Label htmlFor="loginPassword" className="text-sm font-semibold text-navy-blue">
                  Password
                </Label>
                <Input
                  type="password"
                  id="loginPassword"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="mt-2"
                  placeholder="password123"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-blue text-white hover:bg-blue-900"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Demo credentials:</p>
              <p>Email: member@columbiafounders.com</p>
              <p>Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
