import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

// Extend express-session types
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    username?: string;
  }
}

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Portal login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      // Store user data in session
      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Portal logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: "Could not log out" 
        });
      }
      res.json({ 
        success: true, 
        message: "Logged out successfully" 
      });
    });
  });

  // Check session status
  app.get("/api/session", (req, res) => {
    if (req.session.userId) {
      res.json({ 
        success: true, 
        user: { 
          id: req.session.userId, 
          username: req.session.username 
        }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Not authenticated" 
      });
    }
  });

  // Google Calendar events
  app.get("/api/events", async (req, res) => {
    try {
      const calendarId = 'c_a59c7be66200309967d3d4261430affb564c9352ee32f852c52a5fd9479db893@group.calendar.google.com';
      const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
      
      if (!apiKey) {
        console.warn('Google Calendar API key not configured, returning static events');
        // Return static fallback events so the website can go live with content
        const staticEvents = [
          {
            id: 'static-1',
            title: 'Monthly Networking Mixer',
            date: 'First Friday of each month, 6:00 PM',
            location: 'Columbia Faculty House',
            startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Next week
          },
          {
            id: 'static-2',
            title: 'Founder Workshop Series',
            date: 'Every other Wednesday, 7:00 PM',
            location: 'Virtual Event',
            startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
          },
          {
            id: 'static-3',
            title: 'Columbia Startup Showcase',
            date: 'Quarterly Event - Next: Spring 2025',
            location: 'Columbia Business School',
            startTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          },
          {
            id: 'static-4',
            title: 'Mentorship Program Kickoff',
            date: 'Monthly Program Start',
            location: 'Columbia Alumni Center',
            startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks from now
          }
        ];
        
        return res.json({ 
          success: true, 
          events: staticEvents
        });
      }

      // Get current time and future time for filtering
      const now = new Date().toISOString();
      const maxResults = 10;

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        console.error('Calendar API Error:', response.status, response.statusText);
        // Return empty events instead of error to prevent crashes
        return res.json({ 
          success: true, 
          events: [],
          message: "Unable to load calendar events at this time"
        });
      }

      const data = await response.json();
      
      // Transform events to our format with additional error checking
      const events = (data.items || []).map((event: any) => {
        try {
          const startDate = event.start?.dateTime || event.start?.date;
          const formattedDate = startDate ? new Date(startDate).toLocaleString('en-US', {
            timeZone: 'America/New_York',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: event.start?.dateTime ? 'numeric' : undefined,
            minute: event.start?.dateTime ? '2-digit' : undefined
          }) : 'Date TBD';

          return {
            id: event.id || 'unknown',
            title: event.summary || 'Untitled Event',
            date: formattedDate,
            location: event.location || null,
            startTime: startDate
          };
        } catch (eventError) {
          console.warn('Error processing calendar event:', eventError);
          return null;
        }
      }).filter(Boolean); // Remove any null events

      res.json({ success: true, events });
    } catch (error) {
      console.error('Calendar API Error:', error);
      // Return empty events instead of error to prevent deployment crashes
      res.json({ 
        success: true, 
        events: [],
        message: "Unable to load calendar events at this time"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
