import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MemberShowcase } from "@/components/member-showcase";
import { BenefitsSection } from "@/components/benefits-section";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-20 min-h-[70vh] flex items-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 45, 114, 0.4), rgba(0, 45, 114, 0.4)), url('/nyc-hero-bg.jpg')"
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Join the private network for Columbia-connected founders.
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
            CFC is a highly vetted membership community for Columbia-connected entrepreneurs, founders and CEOs seeking belonging, support, and connection.
          </p>
          <Link href="/apply">
            <Button className="bg-white text-navy-blue px-8 py-4 text-lg font-semibold hover:bg-gray-100 shadow-lg border-2 border-white">
              Apply to Join
            </Button>
          </Link>
        </div>
      </section>

      {/* Member Showcase */}
      <MemberShowcase />

      {/* Starting a Company is Lonely Section */}
      <section className="py-20 bg-columbia-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-navy-blue mb-8" style={{ fontFamily: "Georgia, serif" }}>
            Starting a company is lonely.
          </h2>
          <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
            <p>You have to make difficult decisions every day with imperfect information on problems you've likely never faced before. It's daunting.</p>
            <p>In our experience, the best way to overcome the challenges is to learn from the wins and mistakes of others, and to surround yourself with founders who've been there, done that.</p>
            <p>Whether you're building your startup in New York City or launching remotely from anywhere in the world, finding your Columbia founder community is transformative.</p>
            <p className="font-semibold">But when you do find them, it's life changing. And that's what CFC is for.</p>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <BenefitsSection />

      {/* Event Photos Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="CFC networking event"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="CFC founders meeting"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
