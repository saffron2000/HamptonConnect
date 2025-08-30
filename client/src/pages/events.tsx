import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  startTime: string;
}

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  // Fetch events from Google Calendar API
  const { data: eventsData, isLoading, error } = useQuery({
    queryKey: ['/api/events'],
    queryFn: async () => {
      const response = await fetch('/api/events', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'API returned error');
      }
      return data;
    },
    retry: 1,
    retryDelay: 1000
  });

  const events: CalendarEvent[] = eventsData?.events || [];

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

        {/* Upcoming Events Preview */}
        <div>
          <h2 className="text-2xl font-bold text-navy-blue mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Upcoming Events
          </h2>
          
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading events...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load events. Please try again later.</p>
            </div>
          )}
          
          {!isLoading && !error && events.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No upcoming events scheduled.</p>
            </div>
          )}
          
          {!isLoading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-light-gray p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-navy-blue text-lg mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.date}</p>
                    {event.location && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <p className="text-sm">{event.location}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
