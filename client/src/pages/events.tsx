import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const upcomingEvents = [
    {
      title: "Monthly Founder Dinner",
      date: "December 15, 2024 • 7:00 PM",
      description: "Exclusive dinner for CFC members in Manhattan. Network with fellow Columbia founders over fine dining.",
      type: "members-only"
    },
    {
      title: "Startup Pitch Workshop",
      date: "January 8, 2025 • 6:30 PM",
      description: "Perfect your pitch with feedback from successful Columbia alumni investors and entrepreneurs.",
      type: "open"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Member Events
          </h1>
          <p className="text-xl text-gray-700">Stay connected with upcoming CFC events and activities.</p>
        </div>

        {/* Event Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveFilter("upcoming")}
            className={`px-6 py-2 font-medium ${
              activeFilter === "upcoming"
                ? "bg-navy-blue text-white"
                : "border border-navy-blue text-navy-blue bg-white hover:bg-columbia-blue"
            }`}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => setActiveFilter("past")}
            className={`px-6 py-2 font-medium ${
              activeFilter === "past"
                ? "bg-navy-blue text-white"
                : "border border-navy-blue text-navy-blue bg-white hover:bg-columbia-blue"
            }`}
          >
            Past
          </Button>
          <Button
            onClick={() => setActiveFilter("members-only")}
            className={`px-6 py-2 font-medium ${
              activeFilter === "members-only"
                ? "bg-navy-blue text-white"
                : "border border-navy-blue text-navy-blue bg-white hover:bg-columbia-blue"
            }`}
          >
            Members Only
          </Button>
        </div>

        {/* Calendar Embed */}
        <Card className="shadow-lg mb-12">
          <CardContent className="p-8">
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
              <Calendar className="text-4xl text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Google Calendar Integration</h3>
              <p className="text-gray-500 mb-4">Member event calendar will be embedded here</p>
              <div className="bg-gray-100 rounded p-4 text-sm text-gray-600">
                <strong>Implementation:</strong><br />
                <code className="text-xs">
                  {`<iframe src="https://calendar.google.com/calendar/embed?src=[CALENDAR-ID]" width="100%" height="600" frameborder="0"></iframe>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Preview */}
        <div>
          <h2 className="text-2xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-light-gray p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-navy-blue text-lg">{event.title}</h3>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.type === "members-only"
                        ? "bg-navy-blue text-white"
                        : "bg-columbia-blue text-navy-blue"
                    }`}
                  >
                    {event.type === "members-only" ? "Members Only" : "Open"}
                  </span>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
