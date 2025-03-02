
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import TaskList from "@/components/TaskList";
import { Plus, Search, Filter, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Task } from "@/components/gantt/types";
import { getAllTasks, addTask, toggleTaskCompletion } from "@/components/services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  // Formulaire pour nouvelle tâche
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    projectId: "",
    projectName: "",
    dueDate: "",
    priority: "medium" as "low" | "medium" | "high",
    description: ""
  });

  // Charger les tâches
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
        setFilteredTasks(allTasks);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Filtrer les tâches
  useEffect(() => {
    let results = tasks;
    
    // Filtre de recherche
    if (searchQuery) {
      results = results.filter(task => 
        (task.title?.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (task.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.projectName?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filtre par projet
    if (selectedProject) {
      results = results.filter(task => task.projectId === selectedProject);
    }
    
    // Filtre par priorité
    if (selectedPriority) {
      results = results.filter(task => task.priority === selectedPriority);
    }
    
    setFilteredTasks(results);
  }, [tasks, searchQuery, selectedProject, selectedPriority]);

  const handleCompleteTask = async (id: string, completed: boolean) => {
    try {
      await toggleTaskCompletion(id, completed);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed } : task
      ));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCreateTask = async () => {
    try {
      // Trouver le nom du projet à partir de l'ID
      const projectName = newTaskData.projectId === "1" ? "Villa Moderna" : 
                         newTaskData.projectId === "2" ? "Tour Horizon" :
                         newTaskData.projectId === "3" ? "Résidence Eterna" :
                         newTaskData.projectId === "4" ? "Centre Commercial Lumina" :
                         newTaskData.projectId === "5" ? "Bureaux Panorama" :
                         newTaskData.projectId === "6" ? "École Futura" :
                         newTaskData.projectId === "7" ? "Hôtel Riviera" :
                         newTaskData.projectId === "8" ? "Complexe Sportif Olympia" : "";
      
      // Calculer les dates de début et de fin
      const dueDate = newTaskData.dueDate;
      const startDate = new Date(dueDate);
      startDate.setDate(startDate.getDate() - 5); // 5 jours avant la date d'échéance
      
      const newTaskPayload = {
        title: newTaskData.title,
        name: newTaskData.title,
        projectId: newTaskData.projectId,
        projectName: projectName,
        dueDate: dueDate,
        start: startDate.toISOString().split('T')[0],
        end: dueDate,
        priority: newTaskData.priority,
        completed: false,
        progress: 0
      };
      
      const createdTask = await addTask(newTaskPayload);
      setTasks(prevTasks => [...prevTasks, createdTask]);
      
      // Réinitialiser le formulaire
      setNewTaskData({
        title: "",
        projectId: "",
        projectName: "",
        dueDate: "",
        priority: "medium",
        description: ""
      });
      
      setIsNewTaskSheetOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
    }
  };

  // Filtrer les tâches pour différentes vues
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);
  const highPriorityTasks = filteredTasks.filter(task => task.priority === 'high' && !task.completed);
  
  // Calcul des tâches en retard
  const overdueTasks = filteredTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now && !task.completed;
  });

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Tâches</h1>
            <p className="text-muted-foreground">
              Gérez et organisez vos tâches sur tous les projets
            </p>
          </div>
          <Button onClick={() => setIsNewTaskSheetOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle tâche
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">À faire</p>
                <p className="text-3xl font-semibold">{pendingTasks.length}</p>
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
                <p className="text-muted-foreground text-sm mb-1">Terminées</p>
                <p className="text-3xl font-semibold">{completedTasks.length}</p>
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
                <p className="text-muted-foreground text-sm mb-1">Priorité haute</p>
                <p className="text-3xl font-semibold">{highPriorityTasks.length}</p>
              </div>
              <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">En retard</p>
                <p className="text-3xl font-semibold">{overdueTasks.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher une tâche..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les projets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les projets</SelectItem>
                  <SelectItem value="1">Villa Moderna</SelectItem>
                  <SelectItem value="2">Tour Horizon</SelectItem>
                  <SelectItem value="3">Résidence Eterna</SelectItem>
                  <SelectItem value="4">Centre Commercial Lumina</SelectItem>
                  <SelectItem value="5">Bureaux Panorama</SelectItem>
                  <SelectItem value="6">École Futura</SelectItem>
                  <SelectItem value="7">Hôtel Riviera</SelectItem>
                  <SelectItem value="8">Complexe Sportif Olympia</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Toutes les priorités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les priorités</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProject("");
                  setSelectedPriority("");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">À faire</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <TaskList 
            tasks={filteredTasks} 
            title="Toutes les tâches" 
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <TaskList 
            tasks={pendingTasks} 
            title="Tâches à faire" 
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <TaskList 
            tasks={completedTasks} 
            title="Tâches terminées" 
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>
        
        <TabsContent value="overdue">
          <TaskList 
            tasks={overdueTasks} 
            title="Tâches en retard" 
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>
      </Tabs>

      {/* Panneau de création de tâche */}
      <Sheet open={isNewTaskSheetOpen} onOpenChange={setIsNewTaskSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Nouvelle tâche</SheetTitle>
            <SheetDescription>
              Créez une nouvelle tâche pour un projet. Remplissez les détails ci-dessous.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Titre de la tâche</Label>
              <Input 
                id="task-title" 
                placeholder="Entrez le titre de la tâche"
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-name">Projet associé</Label>
              <Select 
                value={newTaskData.projectId} 
                onValueChange={(value) => setNewTaskData({...newTaskData, projectId: value})}
              >
                <SelectTrigger id="project-name">
                  <SelectValue placeholder="Sélectionner un projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Villa Moderna</SelectItem>
                  <SelectItem value="2">Tour Horizon</SelectItem>
                  <SelectItem value="3">Résidence Eterna</SelectItem>
                  <SelectItem value="4">Centre Commercial Lumina</SelectItem>
                  <SelectItem value="5">Bureaux Panorama</SelectItem>
                  <SelectItem value="6">École Futura</SelectItem>
                  <SelectItem value="7">Hôtel Riviera</SelectItem>
                  <SelectItem value="8">Complexe Sportif Olympia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Date d'échéance</Label>
              <Input 
                id="due-date" 
                type="date"
                value={newTaskData.dueDate}
                onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Priorité</Label>
              <RadioGroup 
                value={newTaskData.priority}
                onValueChange={(value) => setNewTaskData({...newTaskData, priority: value as "low" | "medium" | "high"})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Faible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Moyenne</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">Haute</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Description (optionnelle)</Label>
              <Input 
                id="task-description" 
                placeholder="Description de la tâche"
                value={newTaskData.description}
                onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
              />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsNewTaskSheetOpen(false)}>Annuler</Button>
            <Button 
              onClick={handleCreateTask}
              disabled={!newTaskData.title || !newTaskData.projectId || !newTaskData.dueDate}
            >
              Créer la tâche
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
};

export default Tasks;
