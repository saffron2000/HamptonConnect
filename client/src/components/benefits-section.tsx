import { Users, MessageSquare, Calendar, GraduationCap, Star, Handshake } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Monthly Core Groups",
    description: "A group of 8 Columbia-connected founders with an executive facilitator, sharing advice and critical feedback to accelerate business growth."
  },
  {
    icon: MessageSquare,
    title: "Digital Community",
    description: "Access to a highly engaged digital community providing helpful advice, dedicated digital concierge, and weekly newsletter."
  },
  {
    icon: Calendar,
    title: "In-Person Events",
    description: "Monthly member dinners, annual retreats, and local adventures focused on building lasting connections."
  },
  {
    icon: GraduationCap,
    title: "Speaker Series & Education",
    description: "Unique workshops and access to hard-to-reach experts across various topics, leveraging Columbia's extensive network."
  },
  {
    icon: Star,
    title: "Exclusive Perks",
    description: "Secured exclusive discounts with popular software companies, tools, and apps, plus robust preferred vendor database."
  },
  {
    icon: Handshake,
    title: "Columbia Network Access",
    description: "Leverage the power of Columbia's global alumni network spanning business, technology, and academia."
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Member Benefits
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-navy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-white text-xl w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-blue mb-3" style={{ fontFamily: "Georgia, serif" }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
