import { Card } from "@/components/ui/card";
import RoopePhoto from "@assets/Roope_1754271199573.jpg";
import JayPhoto from "@assets/Jay_1754271199571.jpg";
import HanyPhoto from "@assets/Hany_1754271199570.jpg";
import SarahPhoto from "@assets/Sarah_1754271199574.jpg";
import EugenePhoto from "@assets/Eugene_1754271199567.jpg";
import JoelPhoto from "@assets/Joel_1754271199572.jpg";
import RafaelPhoto from "@assets/Rafael_1754271199568.jpg";

const leaders = [
  {
    name: "Roope Marttila",
    title: "3x Founder",
    description: "Roope Marttila is a 3x founder of companies serving 450K unique users and creating $310M of value for their clients. He's a Columbia Law School graduate who's been an entrepreneur for 15 years.",
    imageUrl: RoopePhoto
  },
  {
    name: "Jay Newton-Small",
    title: "Founder, PlanAllies",
    description: "Jay is the founder of PlanAllies, a B2B SaaS platform disrupting call centers by replacing scripts with open, free-flowing conversations that collect superior data.",
    imageUrl: JayPhoto
  },
  {
    name: "Hany K. Syed",
    title: "Co-Founder, Lens of Sport",
    description: "VC/PE leader and former C-suite executive in social infrastructure sectors. Specializes in scaling venture-backed companies globally. Co-founder and CEO of Lens of Sport, a fan intelligence platform for sports and entertainment.",
    imageUrl: HanyPhoto
  },
  {
    name: "Sarah Ribner",
    title: "Founder, PiperWai",
    description: "Columbia MBA and UPenn alum. 2x founder behind PiperWai, a sustainable hygiene brand featured on Shark Tank, and a CPG growth advisor focused on wellness, impact, and community.",
    imageUrl: SarahPhoto
  },
  {
    name: "Eugene Major",
    title: "Founder, Dunbar Capital",
    description: "Startup founder in the financial sector. Currently incoming CEO of an early-stage biotech university spinout. Columbia alum with a background in capital markets and venture building.",
    imageUrl: EugenePhoto
  },
  {
    name: "Joel Phillips",
    title: "Founder & Strategist",
    description: "Columbia economics graduate and entrepreneur with experience across SaaS, tech, and advisory. Known for human-centered strategy and digital-first growth leadership.",
    imageUrl: JoelPhoto
  },
  {
    name: "Rafael G. Canario",
    title: "Founder & CEO, Shaker",
    description: "Founder of Shaker, a SaaS platform powering engagement for universities, accelerators, and membership networks. Serial entrepreneur streamlining community management around the world.",
    imageUrl: RafaelPhoto
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
            Global Leadership Board
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

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-4xl mx-auto">
            The Columbia Founders Community is a not-for-profit initiative, not affiliated with Columbia University, and independently organized by alumni from Columbia who have also founded their own companies.
          </p>
        </div>
      </div>
    </section>
  );
}
