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
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have questions, ideas, or feedback? We're here to listen. Fill out the form to start a conversation with our dedicated Community Managers.
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
                  disabled={isSubmitting}
                  className="bg-navy-blue text-white px-8 py-3 text-lg font-semibold hover:bg-blue-900 shadow-lg"
                >
                  {isSubmitting ? "SENDING..." : "SEND"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-light-gray p-6 text-center">
              <Mail className="text-2xl text-navy-blue mb-3 mx-auto" />
              <h3 className="font-semibold text-navy-blue mb-2">Email</h3>
              <p className="text-gray-600">hello@columbiafounders.com</p>
            </Card>
            <Card className="bg-light-gray p-6 text-center">
              <MapPin className="text-2xl text-navy-blue mb-3 mx-auto" />
              <h3 className="font-semibold text-navy-blue mb-2">Location</h3>
              <p className="text-gray-600">New York, NY</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
