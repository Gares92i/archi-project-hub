
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  FileText, 
  MapPin, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  Users,
  Building,
  BarChart3,
  ListChecks,
  MessageCircle
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTasksByProjectId } from "@/components/services/taskService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectCardProps } from "@/components/ProjectCard";
import TaskList, { Task } from "@/components/TaskList";

// Mock projects data for demonstration
const projectsData: ProjectCardProps[] = [
  {
    id: "1",
    name: "Villa Moderna",
    client: "Famille Martin",
    location: "Aix-en-Provence, France",
    startDate: "2023-01-15",
    endDate: "2023-12-30",
    progress: 75,
    status: "construction",
    teamSize: 6,
    imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
  },
  {
    id: "2",
    name: "Tour Horizon",
    client: "Groupe Immobilier Altitude",
    location: "Lyon, France",
    startDate: "2023-03-01",
    endDate: "2025-06-30",
    progress: 30,
    status: "design",
    teamSize: 12,
    imageUrl: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
  },
  {
    id: "3",
    name: "Résidence Eterna",
    client: "Coopérative Habitat Plus",
    location: "Bordeaux, France",
    startDate: "2022-11-10",
    endDate: "2024-04-15",
    progress: 90,
    status: "construction",
    teamSize: 8,
  },
  {
    id: "4",
    name: "Centre Commercial Lumina",
    client: "Investissements Urbains SA",
    location: "Lille, France",
    startDate: "2023-05-01",
    endDate: "2025-09-30",
    progress: 10,
    status: "planning",
    teamSize: 15,
  },
  {
    id: "5",
    name: "Bureaux Panorama",
    client: "Tech Innovations Inc.",
    location: "Paris, France",
    startDate: "2023-02-15",
    endDate: "2024-08-20",
    progress: 45,
    status: "design",
    teamSize: 9,
  },
  {
    id: "6",
    name: "École Futura",
    client: "Ministère de l'Éducation",
    location: "Nantes, France",
    startDate: "2023-07-01",
    endDate: "2025-01-10",
    progress: 5,
    status: "planning",
    teamSize: 11,
  },
  {
    id: "7",
    name: "Hôtel Riviera",
    client: "Groupe Hospitalité Luxe",
    location: "Nice, France",
    startDate: "2022-09-15",
    endDate: "2024-05-30",
    progress: 65,
    status: "construction",
    teamSize: 14,
  },
  {
    id: "8",
    name: "Complexe Sportif Olympia",
    client: "Ville de Marseille",
    location: "Marseille, France",
    startDate: "2023-04-01",
    endDate: "2025-03-15",
    progress: 20,
    status: "design",
    teamSize: 10,
  },
];

const statusConfig = {
  "planning": { label: "Planification", color: "bg-blue-500" },
  "design": { label: "Conception", color: "bg-purple-500" },
  "construction": { label: "Construction", color: "bg-yellow-500" },
  "completed": { label: "Terminé", color: "bg-green-500" },
  "on-hold": { label: "En pause", color: "bg-gray-500" },
};

// Mock team members
const teamMembers = [
  { id: "1", name: "Sophie Laurent", role: "Architecte principal", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Thomas Dubois", role: "Ingénieur structure", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Marie Lefevre", role: "Designer d'intérieur", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Jean Moreau", role: "Chef de projet", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Camille Bernard", role: "Architecte paysagiste", avatar: "https://i.pravatar.cc/150?u=5" },
];

// Mock tasks for the project
const projectTasks: Task[] = [
  { 
    id: "task1", 
    title: "Finaliser les plans d'étage", 
    projectName: "Villa Moderna",
    dueDate: "2023-03-15",
    priority: "high",
    completed: true
  },
  { 
    id: "task2", 
    title: "Soumettre les demandes de permis", 
    projectName: "Villa Moderna",
    dueDate: "2023-04-20",
    priority: "high",
    completed: false
  },
  { 
    id: "task3", 
    title: "Sélectionner les matériaux de façade", 
    projectName: "Villa Moderna",
    dueDate: "2023-05-10",
    priority: "medium",
    completed: false
  },
  { 
    id: "task4", 
    title: "Réviser le budget de construction", 
    projectName: "Villa Moderna",
    dueDate: "2023-05-30",
    priority: "medium",
    completed: false
  },
  { 
    id: "task5", 
    title: "Planifier la réunion avec les clients", 
    projectName: "Villa Moderna",
    dueDate: "2023-06-15",
    priority: "low",
    completed: false
  }
];

// Mock documents for the project
const projectDocuments = [
  { id: "doc1", name: "Plans_architecturaux_v2.pdf", type: "pdf", size: "8.5 MB", date: "2023-03-10" },
  { id: "doc2", name: "Budget_prévisionnel.xlsx", type: "xls", size: "1.2 MB", date: "2023-02-28" },
  { id: "doc3", name: "Rendus_3D_facade.jpg", type: "img", size: "5.7 MB", date: "2023-03-15" },
  { id: "doc4", name: "Contrat_client_signé.pdf", type: "pdf", size: "3.1 MB", date: "2023-01-20" },
  { id: "doc5", name: "Calendrier_travaux.xlsx", type: "xls", size: "0.9 MB", date: "2023-03-05" },
];

// Mock milestones for the project
const projectMilestones = [
  { id: "m1", title: "Approbation des plans", date: "2023-02-15", completed: true },
  { id: "m2", title: "Obtention du permis de construire", date: "2023-05-20", completed: false },
  { id: "m3", title: "Début des travaux de fondation", date: "2023-07-10", completed: false },
  { id: "m4", title: "Achèvement du gros oeuvre", date: "2023-10-30", completed: false },
  { id: "m5", title: "Finitions intérieures", date: "2023-11-25", completed: false },
  { id: "m6", title: "Livraison au client", date: "2023-12-20", completed: false },
];

// Project statistics for charts
const projectStats = {
  budgetTotal: 750000,
  budgetUsed: 425000,
  timelineProgress: 58,
  tasksCompleted: 12,
  tasksInProgress: 8,
  tasksTodo: 15,
  documentsCount: 24,
  commentsCount: 37,
  meetingsCount: 8,
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectCardProps | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate API call to fetch project details
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      fetchProjectTasks(foundProject.id);
    } else {
      // Navigate to 404 if project not found
      navigate("/not-found");
    }
  }, [id, navigate]);

  const fetchProjectTasks = async (projectId: string) => {
    try {
      const projectTasks = await getTasksByProjectId(projectId);
      setTasks(projectTasks);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches du projet :", error);
    }
  };

  if (!project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <p>Chargement...</p>
        </div>
      </MainLayout>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  const handleEditProject = (projectId: string) => {
    // Code pour éditer le projet
    console.log(`Édition du projet ${projectId}`);
  };
  const handleExportProject = (projectId: string) => {
    // Code pour exporter le projet en PDF
    console.log(`Exportation du projet ${projectId} en PDF`);
  };
  const handleArchiveProject = (projectId: string) => {
    // Code pour archiver le projet
    console.log(`Archivage du projet ${projectId}`);
  };
  const handleShareProject = (projectId: string) => {
    // Code pour partager le projet
    console.log(`Partage du projet ${projectId}`);
  };
  const handleDuplicateProject = (projectId: string) => {
    // Code pour dupliquer le projet
    console.log(`Duplication du projet ${projectId}`);
  };
  return (
    <MainLayout>
      <div className="relative">
        {/* Project header with image background */}
        <div className="h-48 md:h-64 rounded-lg overflow-hidden mb-16">
          <div
            className="w-full h-full bg-gradient-to-r from-architect-700 to-architect-900 relative"
            style={
              project.imageUrl 
                ? { 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${project.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } 
                : {}
            }
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.name}</h1>
                  <p className="text-white/80">{project.client}</p>
                </div>
                <div className="flex gap-2">
                <Button variant="secondary" onClick={() => handleEditProject(project.id)}>
  <Pencil className="h-4 w-4 mr-2" />
  Modifier
</Button>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={() => handleDuplicateProject(project.id)}>Dupliquer le projet</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleExportProject(project.id)}>Exporter en PDF</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleShareProject(project.id)}>Partager</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive" onClick={() => handleArchiveProject(project.id)}>Archiver</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status badge and progress */}
        <div className="absolute top-36 md:top-52 left-6 bg-white dark:bg-background rounded-lg shadow-lg p-4 border">
          <div className="flex flex-col items-center">
            <Badge className={`${statusConfig[project.status].color} text-white px-2.5 py-1 text-xs mb-3`}>
              {statusConfig[project.status].label}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span>{project.progress}%</span>
              <Progress value={project.progress} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Project information cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Détails du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Localisation</p>
                  <p className="font-medium">{project.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Période</p>
                  <p className="font-medium">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Équipe</p>
                  <p className="font-medium">{project.teamSize} membres</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Budget utilisé</p>
                  <p className="text-sm font-medium">{Math.round(projectStats.budgetUsed / projectStats.budgetTotal * 100)}%</p>
                </div>
                <Progress value={Math.round(projectStats.budgetUsed / projectStats.budgetTotal * 100)} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium text-lg">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(projectStats.budgetTotal)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dépensé</p>
                  <p className="font-medium text-lg">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(projectStats.budgetUsed)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-sm font-medium">{projectStats.timelineProgress}%</p>
                </div>
                <Progress value={projectStats.timelineProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="border rounded-lg p-2 text-center">
                  <p className="text-green-600 font-medium">{projectStats.tasksCompleted}</p>
                  <p className="text-xs text-muted-foreground">Complétées</p>
                </div>
                <div className="border rounded-lg p-2 text-center">
                  <p className="text-blue-600 font-medium">{projectStats.tasksInProgress}</p>
                  <p className="text-xs text-muted-foreground">En cours</p>
                </div>
                <div className="border rounded-lg p-2 text-center">
                  <p className="text-gray-600 font-medium">{projectStats.tasksTodo}</p>
                  <p className="text-xs text-muted-foreground">À faire</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project tabs for detailed content */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="milestones">Jalons</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Tâches récentes</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/projects/${id}/tasks`)}>
                      Voir tout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TaskList tasks={projectTasks.slice(0, 3)} title="Tâches récentes" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Jalons du projet</CardTitle>
                    <Button variant="ghost" size="sm" className="text-sm">
                      Voir tout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectMilestones.slice(0, 3).map(milestone => (
                      <div key={milestone.id} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(milestone.date) < new Date() && !milestone.completed 
                              ? "En retard - " 
                              : ""}
                            {formatDate(milestone.date)}
                          </p>
                        </div>
                        <Badge variant={milestone.completed ? "default" : "outline"}>
                          {milestone.completed ? "Terminé" : "À venir"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Équipe du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.slice(0, 4).map(member => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                    {teamMembers.length > 4 && (
                      <Button variant="ghost" size="sm" className="w-full">
                        Voir tous les membres ({teamMembers.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Documents récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectDocuments.slice(0, 3).map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 border rounded-md p-2">
                        <div className={`p-2 rounded-md ${
                          doc.type === 'pdf' ? 'bg-red-100 text-red-700' :
                          doc.type === 'xls' ? 'bg-green-100 text-green-700' : 
                          doc.type === 'img' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • {formatDate(doc.date)}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full">
                      Voir tous les documents ({projectDocuments.length})
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 border rounded-md">
                      <FileText className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xl font-semibold">{projectStats.documentsCount}</p>
                      <p className="text-xs text-muted-foreground">Documents</p>
                    </div>
                    <div className="text-center p-2 border rounded-md">
                      <ListChecks className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xl font-semibold">{projectStats.tasksCompleted + projectStats.tasksInProgress + projectStats.tasksTodo}</p>
                      <p className="text-xs text-muted-foreground">Tâches</p>
                    </div>
                    <div className="text-center p-2 border rounded-md">
                      <MessageCircle className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xl font-semibold">{projectStats.commentsCount}</p>
                      <p className="text-xs text-muted-foreground">Commentaires</p>
                    </div>
                    <div className="text-center p-2 border rounded-md">
                      <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xl font-semibold">{projectStats.meetingsCount}</p>
                      <p className="text-xs text-muted-foreground">Réunions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Tâches</CardTitle>
                <CardDescription>Gérez les tâches du projet</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle tâche
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <TaskList tasks={tasks} title="Toutes les tâches" />
          </CardContent>
        </Card>
      </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Équipe</CardTitle>
                  <CardDescription>Membres de l'équipe travaillant sur ce projet</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un membre
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <div key={member.id} className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">Profil</Button>
                      <Button variant="outline" size="sm">Message</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Tous les documents liés au projet</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Importer
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau document
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium">Nom</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Taille</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectDocuments.map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{doc.name}</td>
                        <td className="py-3 px-4">{doc.type.toUpperCase()}</td>
                        <td className="py-3 px-4">{doc.size}</td>
                        <td className="py-3 px-4">{formatDate(doc.date)}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Télécharger</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Jalons</CardTitle>
                  <CardDescription>Suivez les étapes clés du projet</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un jalon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {projectMilestones.map((milestone, index) => (
                  <div key={milestone.id} className="mb-8 relative">
                    {/* Timeline connector */}
                    {index < projectMilestones.length - 1 && (
                      <div className="absolute left-[-16px] top-3 w-[2px] h-full bg-gray-200"></div>
                    )}
                    
                    {/* Timeline marker */}
                    <div className={`absolute left-[-20px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      milestone.completed ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-300 text-gray-500'
                    }`}>
                      {milestone.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Milestone content */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{milestone.title}</h3>
                        <Badge variant={milestone.completed ? "default" : "outline"}>
                          {milestone.completed ? "Terminé" : "À venir"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {formatDate(milestone.date)}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Détails</Button>
                        {!milestone.completed && (
                          <Button variant="outline" size="sm">Marquer comme terminé</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProjectDetails;
