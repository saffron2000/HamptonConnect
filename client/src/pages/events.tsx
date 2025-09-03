import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("upcoming");

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
        <div className="flex justify-center gap-4 mb-8">
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
        </div>

        {/* Calendar Embed */}
        <Card className="shadow-lg mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-navy-blue mb-2" style={{ fontFamily: "Georgia, serif" }}>
                Member Events Calendar
              </h3>
              <p className="text-gray-700">
                Stay up-to-date with all Columbia Founder Community events and activities
              </p>
            </div>
            <div className="flex justify-center">
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=c_a59c7be66200309967d3d4261430affb564c9352ee32f852c52a5fd9479db893%40group.calendar.google.com&ctz=America%2FNew_York" 
                style={{ border: 0 }} 
                width="800" 
                height="600" 
                frameBorder="0" 
                scrolling="no"
                className="rounded-lg shadow-md max-w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Information */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Event Information
          </h2>
          <p className="text-gray-600 text-lg">
            All upcoming events and activities are displayed in the calendar above. 
            Check the calendar regularly for the latest updates on member events.
          </p>
        </div>
      </div>
    </section>
  );
}
