import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

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

  // Google Calendar events
  app.get("/api/events", async (req, res) => {
    try {
      const calendarId = 'c_a59c7be66200309967d3d4261430affb564c9352ee32f852c52a5fd9479db893@group.calendar.google.com';
      const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          success: false, 
          message: "Google Calendar API key not configured" 
        });
      }

      // Get current time and future time for filtering
      const now = new Date().toISOString();
      const maxResults = 10;

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('Calendar API Error:', response.status, response.statusText);
        return res.status(response.status).json({ 
          success: false, 
          message: `Calendar API error: ${response.statusText}` 
        });
      }

      const data = await response.json();
      
      // Transform events to our format
      const events = data.items?.map((event: any) => {
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
          id: event.id,
          title: event.summary || 'Untitled Event',
          date: formattedDate,
          location: event.location || null,
          startTime: startDate
        };
      }) || [];

      res.json({ success: true, events });
    } catch (error) {
      console.error('Calendar API Error:', error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch events" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
