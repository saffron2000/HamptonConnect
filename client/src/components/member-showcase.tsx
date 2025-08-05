import { Card } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import ManjuPhoto from "@assets/Manju_1754272956679.jpg";
import HanyPhoto from "@assets/Hany_1754272790149.jpg";
import BrianPhoto from "@assets/Brian_1754272956678.jpg";

interface Member {
  name: string;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
}

const members: Member[] = [
  {
    name: "Manju Dawkins, MD",
    title: "Founder",
    company: "Thimble",
    description: "Physician entrepreneur and keynote speaker. Founder of Thimble, focused on compassionate needle pain care.",
    imageUrl: ManjuPhoto,
    linkedinUrl: "https://www.linkedin.com/in/manju-dawkins-md/"
  },
  {
    name: "Hany K. Syed",
    title: "Founder",
    company: "Lens of Sport",
    description: "VC/PE leader turned founder. Building data platforms for sports, media, and education sectors.",
    imageUrl: HanyPhoto,
    linkedinUrl: "https://www.linkedin.com/in/hany-k-syed-165b9631/"
  },
  {
    name: "Brian Keenan",
    title: "Founder",
    company: "AdvisorGenie",
    description: "Columbia MBA & serial founder with deep fintech roots. Merging AI and strategy to elevate financial advisors.",
    imageUrl: BrianPhoto,
    linkedinUrl: "https://www.linkedin.com/in/bkeenan/"
  },
  {
    name: "Verity Sylvester",
    title: "Co-Founder & COO",
    company: "Branch",
    description: "Columbia MBA '19. Co-founded the world's fastest growing office furniture brand. Led 7000% growth during pandemic pivot.",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "https://www.linkedin.com/in/verity-sylvester/"
  },
  {
    name: "Hendra Soetjahja",
    title: "Founder & CEO",
    company: "Kilohana.AI",
    description: "Columbia PhD candidate in AI & Robotics. IBM Research Fellow. 20+ years managing multi-billion dollar assets on Wall Street.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "https://www.linkedin.com/in/hendra-soetjahja/"
  },
  {
    name: "Tina Haertel",
    title: "Co-Founder & COO",
    company: "Adauris",
    description: "Columbia '15 Urban Studies. AI-powered content platform. Selected for Morgan Stanley Inclusive Ventures Lab from 7,900+ applicants.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "https://www.linkedin.com/in/tina-haertel/"
  }
];

export function MemberShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Columbia founders run some of the fastest growing startups in the world.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Some are bootstrapped, others venture-backed. But all our members seek belonging, support, and connection with a selective group of their peers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <Card key={index} className="bg-light-gray p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={`${member.name} headshot`}
                    className="w-full h-full object-cover"
                    style={
                      member.name === "Manju Dawkins, MD" ? { 
                        objectPosition: "center 25%",
                        transform: "scale(1.8)"
                      } :
                      member.name === "Brian Keenan" ? { 
                        objectPosition: "50% 30%",
                        transform: "scale(1.7)"
                      } :
                      {}
                    }
                  />
                </div>
                <h3 className="text-xl font-bold text-navy-blue" style={{ fontFamily: "Georgia, serif" }}>
                  {member.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {member.title} of {member.company}
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  {member.linkedinUrl && (
                    <a href={member.linkedinUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700">{member.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
