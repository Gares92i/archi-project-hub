import { CalendarClock, CheckCircle, Clock, LineChart, Activity, AlertCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskList from "@/components/TaskList";
import DocumentsList from "@/components/DocumentsList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const recentTasks = [
  {
    id: "1",
    title: "Finaliser les plans d'étage pour Villa Moderna",
    name: "Finaliser les plans d'étage pour Villa Moderna",
    projectName: "Villa Moderna",
    dueDate: "2023-06-30",
    priority: "high" as const,
    completed: false,
    start: "2023-06-20",
    end: "2023-06-30",
    progress: 60
  },
  {
    id: "2",
    title: "Réviser le cahier des charges pour Tour Horizon",
    name: "Réviser le cahier des charges pour Tour Horizon",
    projectName: "Tour Horizon",
    dueDate: "2023-06-25",
    priority: "medium" as const,
    completed: false,
    start: "2023-06-15",
    end: "2023-06-25",
    progress: 30
  },
  {
    id: "3",
    title: "Préparer la présentation client pour Résidence Eterna",
    name: "Préparer la présentation client pour Résidence Eterna",
    projectName: "Résidence Eterna",
    dueDate: "2023-06-24",
    priority: "low" as const,
    completed: true,
    start: "2023-06-10",
    end: "2023-06-24",
    progress: 100
  },
  {
    id: "4",
    title: "Soumettre les permis de construire pour Centre Commercial Lumina",
    name: "Soumettre les permis de construire pour Centre Commercial Lumina",
    projectName: "Centre Commercial Lumina",
    dueDate: "2023-06-28",
    priority: "high" as const,
    completed: false,
    start: "2023-06-15",
    end: "2023-06-28",
    progress: 40
  },
];

const recentDocuments = [
  {
    id: "1",
    name: "Villa_Moderna_Plans_Final.pdf",
    type: "pdf" as const,
    projectName: "Villa Moderna",
    uploadDate: "2023-06-20",
    size: "4.2 MB",
  },
  {
    id: "2",
    name: "Tour_Horizon_CCTP.docx",
    type: "doc" as const,
    projectName: "Tour Horizon",
    uploadDate: "2023-06-18",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Residence_Eterna_Presentation.pptx",
    type: "other" as const,
    projectName: "Résidence Eterna",
    uploadDate: "2023-06-19",
    size: "12.5 MB",
  },
  {
    id: "4",
    name: "Rendu_3D_Facade_Principale.jpg",
    type: "img" as const,
    projectName: "Villa Moderna",
    uploadDate: "2023-06-17",
    size: "8.7 MB",
  },
];

const projectList = [
  { name: "Villa Moderna", progress: 75, status: "En cours" },
  { name: "Tour Horizon", progress: 30, status: "En cours" },
  { name: "Résidence Eterna", progress: 90, status: "En cours" },
  { name: "Centre Commercial Lumina", progress: 10, status: "Nouveau" },
  { name: "Bureaux Panorama", progress: 45, status: "En cours" },
];

const notificationsList = [
  { 
    id: 1, 
    type: "info", 
    message: "Réunion projet Villa Moderna fixée pour demain 14h",
    time: "1h ago"
  },
  { 
    id: 2, 
    type: "alert", 
    message: "Retard sur le planning du projet Tour Horizon",
    time: "3h ago"
  },
  { 
    id: 3, 
    type: "success", 
    message: "Permis de construire accepté pour Résidence Eterna",
    time: "Today"
  },
  { 
    id: 4, 
    type: "info", 
    message: "Nouveau document partagé sur Centre Commercial Lumina",
    time: "Yesterday"
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNewProject = () => {
    // Dans une application réelle, cela ouvrirait probablement un formulaire de création de projet
    toast({
      title: "Création de projet",
      description: "Formulaire de création de projet en cours de développement",
    });
    // Rediriger vers la page des projets
    navigate("/projects");
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre espace de gestion de projets architecturaux
            </p>
          </div>
          <Button onClick={handleNewProject}>+ Nouveau projet</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Projets actifs</p>
                <p className="text-3xl font-semibold">8</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Tâches à faire</p>
                <p className="text-3xl font-semibold">12</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Tâches complétées</p>
                <p className="text-3xl font-semibold">27</p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Réunions à venir</p>
                <p className="text-3xl font-semibold">4</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <CalendarClock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Progression des projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectList.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">{project.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            project.status === "Nouveau" 
                              ? "bg-blue-500/10 text-blue-700 border-blue-500/30" 
                              : "bg-green-500/10 text-green-700 border-green-500/30"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Notifications récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationsList.map((notification) => (
                  <div key={notification.id} className="flex gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === "info" 
                        ? "bg-blue-500/10" 
                        : notification.type === "alert" 
                        ? "bg-red-500/10" 
                        : "bg-green-500/10"
                    }`}>
                      {notification.type === "info" && <Activity className="h-4 w-4 text-blue-500" />}
                      {notification.type === "alert" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      {notification.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tâches récentes</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <TaskList tasks={recentTasks} title="Tâches récentes" />
          </TabsContent>
          <TabsContent value="upcoming">
            <TaskList 
              tasks={recentTasks.filter(task => new Date(task.dueDate) > new Date())} 
              title="Tâches à venir" 
            />
          </TabsContent>
        </Tabs>

        <DocumentsList documents={recentDocuments} title="Documents récents" />
      </div>
    </MainLayout>
  );
};

export default Index;
