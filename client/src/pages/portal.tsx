import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Shield, ArrowRight } from "lucide-react";

export default function Portal() {
  // Auto-redirect after 3 seconds for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open('https://shakernetwork.com/login?cd=864428', '_blank');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleImmediateLogin = () => {
    window.open('https://shakernetwork.com/login?cd=864428', '_blank');
  };

  return (
    <section className="py-20 min-h-screen bg-gradient-to-br from-columbia-blue to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Member Portal
          </h1>
          <p className="text-xl text-gray-700">Access exclusive resources and community tools.</p>
        </div>
        
        <Card className="shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <Users className="w-16 h-16 text-navy-blue mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Welcome to Your Member Portal
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access your exclusive Columbia Founder Community member resources, networking tools, and community features through our secure Shaker Network platform.
              </p>
            </div>

            <div className="bg-light-gray rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-navy-blue mb-4 flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Secure Member Access
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Access to member directory and networking tools</p>
                <p>• Exclusive content and founder resources</p>
                <p>• Event registration and community calendar</p>
                <p>• Partner discounts and vendor database</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleImmediateLogin}
                className="bg-navy-blue hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg w-full"
              >
                Access Member Portal
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <ArrowRight className="w-4 h-4 mr-2" />
                Auto-redirecting in 3 seconds...
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Login opens securely via Shaker Network platform
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
