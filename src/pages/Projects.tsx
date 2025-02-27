
import { useState } from "react";
import { Building, Filter, Plus, Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  const filterProjects = (status: string) => {
    if (selectedStatuses.includes(status)) {
      // Remove status if already selected
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      // Add status to selection
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSearchQuery("");
    setFilteredProjects(projectsData);
  };
  
  const applyFilters = () => {
    let results = projectsData;
    
    // Apply search query filter
    if (searchQuery) {
      results = results.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filters
    if (selectedStatuses.length > 0) {
      results = results.filter((project) => selectedStatuses.includes(project.status));
    }
    
    setFilteredProjects(results);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Projets</h1>
            <p className="text-muted-foreground">
              Gérez tous vos projets architecturaux en un seul endroit
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un projet..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filtrer par statut</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="planning" 
                      checked={selectedStatuses.includes("planning")}
                      onCheckedChange={() => filterProjects("planning")}
                    />
                    <Label htmlFor="planning">Planification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="design" 
                      checked={selectedStatuses.includes("design")}
                      onCheckedChange={() => filterProjects("design")}
                    />
                    <Label htmlFor="design">Conception</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="construction" 
                      checked={selectedStatuses.includes("construction")}
                      onCheckedChange={() => filterProjects("construction")}
                    />
                    <Label htmlFor="construction">Construction</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="completed" 
                      checked={selectedStatuses.includes("completed")}
                      onCheckedChange={() => filterProjects("completed")}
                    />
                    <Label htmlFor="completed">Terminé</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="on-hold" 
                      checked={selectedStatuses.includes("on-hold")}
                      onCheckedChange={() => filterProjects("on-hold")}
                    />
                    <Label htmlFor="on-hold">En pause</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Réinitialiser
                  </Button>
                  <Button onClick={applyFilters} size="sm">
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="progress-high">Progression (élevée)</SelectItem>
                <SelectItem value="progress-low">Progression (faible)</SelectItem>
                <SelectItem value="alphabetical">Alphabétique</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredProjects.length} projet{filteredProjects.length !== 1 ? "s" : ""} trouvé{filteredProjects.length !== 1 ? "s" : ""}
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grille</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Building className="h-12 w-12 mb-4 text-muted-foreground/50" />
                <p className="text-lg mb-2">Aucun projet trouvé</p>
                <p>Essayez d'ajuster vos filtres ou créez un nouveau projet</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Nom</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Client</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Statut</th>
                  <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Progression</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const statusConfig = {
                    "planning": { label: "Planification", color: "bg-blue-500" },
                    "design": { label: "Conception", color: "bg-purple-500" },
                    "construction": { label: "Construction", color: "bg-yellow-500" },
                    "completed": { label: "Terminé", color: "bg-green-500" },
                    "on-hold": { label: "En pause", color: "bg-gray-500" },
                  };
                  
                  return (
                    <tr key={project.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{project.client}</td>
                      <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{project.location}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${statusConfig[project.status].color}`}>
                          {statusConfig[project.status].label}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                      <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-lg mb-2">Aucun projet trouvé</p>
                      <p>Essayez d'ajuster vos filtres ou créez un nouveau projet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Projects;
