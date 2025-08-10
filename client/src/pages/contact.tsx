import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect to Shaker Network contact form
    window.open('https://shakernetwork.com/survey/get-in-touch', '_blank');
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have questions, ideas, or feedback? We're here to listen. Click below to access our contact form and start a conversation with our dedicated Community Managers.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold text-navy-blue">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="mt-2"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-navy-blue">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-sm font-semibold text-navy-blue">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 resize-vertical"
                  placeholder="Tell us about your question, idea, or feedback..."
                />
              </div>

              {/* Send Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-navy-blue text-white px-8 py-3 text-lg font-semibold hover:bg-blue-900 shadow-lg"
                >
                  CONTACT US
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>


      </div>
    </section>
  );
}
