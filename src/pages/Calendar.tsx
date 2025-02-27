
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  projectName: string;
  type: "meeting" | "deadline" | "site-visit" | "other";
  location?: string;
  description?: string;
}

// Mock data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Réunion de lancement",
    date: new Date(2023, 5, 25),
    startTime: "09:00",
    endTime: "10:30",
    projectName: "Villa Moderna",
    type: "meeting",
    location: "Bureaux Paris"
  },
  {
    id: "2",
    title: "Visite de chantier",
    date: new Date(2023, 5, 26),
    startTime: "14:00",
    endTime: "16:00",
    projectName: "Tour Horizon",
    type: "site-visit",
    location: "Lyon"
  },
  {
    id: "3",
    title: "Deadline permis de construire",
    date: new Date(2023, 5, 28),
    projectName: "Résidence Eterna",
    type: "deadline"
  },
  {
    id: "4",
    title: "Présentation aux clients",
    date: new Date(2023, 5, 29),
    startTime: "11:00",
    endTime: "12:30",
    projectName: "Centre Commercial Lumina",
    type: "meeting",
    location: "Visioconférence"
  },
  {
    id: "5",
    title: "Signature du contrat",
    date: new Date(2023, 5, 30),
    startTime: "15:00",
    endTime: "16:00",
    projectName: "Villa Moderna",
    type: "meeting",
    location: "Bureaux client"
  }
];

// Adjust dates to be current (for demo purposes)
const adjustDatesToCurrentMonth = (events: Event[]): Event[] => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return events.map(event => {
    const newDate = new Date(event.date);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    
    // Ensure we're distributing events around the current date
    // Some before, some after, and one on the current date
    const dayOffset = parseInt(event.id) * 2 - 5; // -3, -1, 1, 3, 5
    newDate.setDate(today.getDate() + dayOffset);
    
    return { ...event, date: newDate };
  });
};

const typeConfig = {
  "meeting": { 
    label: "Réunion", 
    color: "bg-blue-500/10 text-blue-700 border-blue-500/30" 
  },
  "deadline": { 
    label: "Deadline", 
    color: "bg-red-500/10 text-red-700 border-red-500/30" 
  },
  "site-visit": { 
    label: "Visite", 
    color: "bg-green-500/10 text-green-700 border-green-500/30" 
  },
  "other": { 
    label: "Autre", 
    color: "bg-purple-500/10 text-purple-700 border-purple-500/30" 
  }
};

const CalendarPage = () => {
  const currentEvents = adjustDatesToCurrentMonth(mockEvents);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // Filter events based on selected date and project
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    let filteredEvents = currentEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
    
    if (selectedProject) {
      filteredEvents = filteredEvents.filter(event => event.projectName === selectedProject);
    }
    
    return filteredEvents;
  };
  
  // Get unique projects for the filter
  const projects = Array.from(new Set(currentEvents.map(event => event.projectName)));
  
  // Get events for the selected date
  const eventsForSelectedDate = getEventsForDate(date);
  
  // Format a date to display in header
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };
  
  // Function to determine if a date has events
  const hasEventsOnDate = (day: Date) => {
    return currentEvents.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear() &&
      (!selectedProject || event.projectName === selectedProject)
    );
  };

  // Format time from HH:MM format
  const formatTime = (time?: string) => {
    if (!time) return "";
    return time.replace(":", "h");
  };

  // Go to previous/next day
  const goToPreviousDay = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      setDate(newDate);
    }
  };
  
  const goToNextDay = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      setDate(newDate);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Calendrier</h1>
            <p className="text-muted-foreground">
              Gérez votre planning et vos événements
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Select 
                  value={selectedProject || "all"} 
                  onValueChange={(value) => setSelectedProject(value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les projets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les projets</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    modifiersClassNames={{
                      selected: "bg-primary text-primary-foreground",
                    }}
                    modifiers={{
                      hasEvent: (day) => hasEventsOnDate(day),
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-lg font-medium">
                  {formatDate(date)}
                </CardTitle>
                <Button variant="outline" size="icon" onClick={goToNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map(event => (
                    <div key={event.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-base">{event.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{event.projectName}</p>
                        </div>
                        <Badge variant="outline" className={typeConfig[event.type].color}>
                          {typeConfig[event.type].label}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>
                              {event.startTime && formatTime(event.startTime)}
                              {event.startTime && event.endTime && " - "}
                              {event.endTime && formatTime(event.endTime)}
                            </span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div>
                            <span>📍 {event.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="mt-2 text-sm">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mb-4 text-muted-foreground/50" />
                  <p className="text-lg mb-2">Aucun événement ce jour</p>
                  <p>Sélectionnez une autre date ou créez un nouvel événement</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
