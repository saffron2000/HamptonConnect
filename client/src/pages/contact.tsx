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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Connect with Our Subcommittees
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
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
            <p className="text-gray-600 mb-4 text-sm">
              For visionary planning and long-term goals.
            </p>
            <p className="text-navy-blue font-semibold">
              📧 strategy@columbiafounders.com
            </p>
          </Card>

          {/* Finance, Compliance, and Infrastructure */}
          <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
            <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Finance, Compliance, and Infrastructure Subcommittee
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              For financial matters, compliance questions, and infrastructure insights.
            </p>
            <p className="text-navy-blue font-semibold">
              📧 finance@columbiafounders.com
            </p>
          </Card>

          {/* Member Relations */}
          <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
            <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Member Relations Subcommittee
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              For member engagement, support, and networking opportunities.
            </p>
            <p className="text-navy-blue font-semibold">
              📧 engagement@columbiafounders.com
            </p>
          </Card>

          {/* Partner Relations */}
          <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
            <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Partner Relations Subcommittee
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              For partnership queries and collaboration opportunities.
            </p>
            <p className="text-navy-blue font-semibold">
              📧 partners@columbiafounders.com
            </p>
          </Card>

          {/* Tech and Infrastructure */}
          <Card className="bg-light-gray p-6 text-center shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
            <Mail className="text-3xl text-navy-blue mb-4 mx-auto" />
            <h3 className="font-bold text-navy-blue mb-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Tech and Infrastructure Subcommittee
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              For tech support, infrastructure development, and innovative solutions.
            </p>
            <p className="text-navy-blue font-semibold">
              📧 tech@columbiafounders.com
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
