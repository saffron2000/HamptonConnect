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

        {/* Subcommittees Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Connect with Our Subcommittees
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Our specialized subcommittees are the backbone of our community. Whether you have strategic insights, financial inquiries, member or partner relations, or tech-oriented discussions, our subcommittee experts are ready to assist.
            </p>
          </div>

          {/* Subcommittees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Strategic Planning */}
            <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
              <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
                Strategic Planning Subcommittee
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For visionary planning and long-term goals.
              </p>
              <p className="text-navy-blue font-semibold mb-2 break-words">
                strategy@columbiafounders.com
              </p>
            </Card>

            {/* Finance, Compliance, and Infrastructure */}
            <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
              <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
                Finance, Compliance, and Infrastructure Subcommittee
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For financial matters, compliance questions, and infrastructure insights.
              </p>
              <p className="text-navy-blue font-semibold mb-2 break-words">
                finance@columbiafounders.com
              </p>
            </Card>

            {/* Member Relations */}
            <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
              <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
                Member Relations Subcommittee
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For member engagement, support, and networking opportunities.
              </p>
              <p className="text-navy-blue font-semibold mb-2 break-words">
                engagement@columbiafounders.com
              </p>
            </Card>

            {/* Partner Relations */}
            <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
              <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
                Partner Relations Subcommittee
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For partnership queries and collaboration opportunities.
              </p>
              <p className="text-navy-blue font-semibold mb-2 break-words">
                partners@columbiafounders.com
              </p>
            </Card>

            {/* Tech and Infrastructure */}
            <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
              <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
                Tech and Infrastructure Subcommittee
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For tech support, infrastructure development, and innovative solutions.
              </p>
              <p className="text-navy-blue font-semibold mb-2 break-words">
                tech@columbiafounders.com
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
