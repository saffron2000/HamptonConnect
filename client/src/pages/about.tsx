import { Card } from "@/components/ui/card";

const leaders = [
  {
    name: "Alex Thompson",
    title: "Co-Founder & CEO",
    description: "Columbia Business School MBA '10. Previously led growth at two successful exits totaling $400M+. Founded CFC to create the community he wished existed during his entrepreneurial journey. Active angel investor with 25+ portfolio companies.",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Maria Santos",
    title: "Co-Founder & Chief Community Officer",
    description: "Columbia Engineering '08, Stanford MBA '14. Serial entrepreneur with expertise in community building and startup operations. Previously VP of Community at a $2B unicorn. Passionate about fostering meaningful connections between founders.",
    imageUrl: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "James Chen",
    title: "Advisory Board Chair",
    description: "Columbia College '95. Veteran tech executive and three-time founder. Currently Managing Partner at Columbia Ventures, connecting the university's innovation ecosystem with industry. 20+ years building Columbia's entrepreneurial community.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Sarah Mitchell",
    title: "Director of Member Relations",
    description: "Columbia Journalism School '12. Former VP of Marketing at three NYC-based startups. Expert in content strategy and member engagement. Leads our speaker series and educational programming initiatives.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "David Kumar",
    title: "Head of Partnerships",
    description: "Columbia SEAS '06, Wharton MBA '13. Former Director of Business Development at Google Ventures. Manages strategic partnerships and our exclusive vendor network. Connects members with funding opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Rachel Williams",
    title: "Community Manager",
    description: "Columbia College '16. Previously at WeWork and General Assembly. Specializes in event programming and member onboarding. Organizes our monthly dinners and annual retreats across major cities.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Michael Rodriguez",
    title: "Technical Advisor",
    description: "Columbia Engineering '03. Former CTO at two unicorn startups. Provides technical mentorship to our members and oversees our digital platform development. Active contributor to Columbia's entrepreneurship curriculum.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  }
];

export default function About() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Values Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Mission & Values
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We're a close community of Columbia-connected founders, selectively expanding to support and collaborate with exceptional entrepreneurs dedicated to mutual success.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue text-center mb-12" style={{ fontFamily: "Georgia, serif" }}>
            Leadership Team
          </h2>
          
          <div className="space-y-12">
            {leaders.map((leader, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-light-gray rounded-xl p-8">
                <img
                  src={leader.imageUrl}
                  alt={`${leader.name} headshot`}
                  className="w-48 h-48 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-navy-blue mb-2" style={{ fontFamily: "Georgia, serif" }}>
                    {leader.name}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium mb-4">{leader.title}</p>
                  <p className="text-gray-700 leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columbia Connection */}
        <Card className="bg-columbia-blue p-8 text-center">
          <h2 className="text-3xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
            The Columbia Advantage
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Leveraging Columbia University's world-class network, cutting-edge research, and entrepreneurial ecosystem to support our founders' success. From campus to IPO, Columbia connections open doors.
          </p>
        </Card>
      </div>
    </section>
  );
}
