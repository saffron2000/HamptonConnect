import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Apply() {
  return (
    <section className="py-20 bg-gradient-to-br from-columbia-blue to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Apply to Join
          </h1>
          <p className="text-xl text-gray-700">
            Take our comprehensive application to see if you're a fit for Columbia Founder Community.
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  Ready to Join Our Community?
                </h2>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our application process helps us ensure the best fit for both you and our community. 
                  We're looking for Columbia-connected founders who are building impactful companies and 
                  seeking meaningful connections with their peers.
                </p>
              </div>
              
              <div className="bg-light-gray rounded-lg p-8 mb-8">
                <h3 className="text-xl font-semibold text-navy-blue mb-4">Application Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div>
                    <div className="w-8 h-8 bg-navy-blue text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                    <p><strong>Complete Application</strong><br />Fill out our comprehensive membership application</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-navy-blue text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                    <p><strong>Review Process</strong><br />Our team reviews your application and background</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-navy-blue text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                    <p><strong>Welcome Aboard</strong><br />Approved members receive access to our community</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://shakernetwork.com/survey/columbia-founders-community-membership-application-1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-navy-blue hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                  Start Application
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </a>
              
              <p className="text-sm text-gray-500 mt-4">
                Application opens in a new window via Shaker Network
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
