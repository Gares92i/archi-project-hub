
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import TaskList, { Task } from "@/components/TaskList";
import { Plus, Search, Filter, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
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

// Données de démonstration pour les tâches
const tasksData: Task[] = [
  {
    id: "1",
    title: "Finaliser les plans d'étage pour Villa Moderna",
    projectName: "Villa Moderna",
    dueDate: "2023-06-30",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Réviser le cahier des charges pour Tour Horizon",
    projectName: "Tour Horizon",
    dueDate: "2023-06-25",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Préparer la présentation client pour Résidence Eterna",
    projectName: "Résidence Eterna",
    dueDate: "2023-06-24",
    priority: "low",
    completed: true,
  },
  {
    id: "4",
    title: "Soumettre les permis de construire pour Centre Commercial Lumina",
    projectName: "Centre Commercial Lumina",
    dueDate: "2023-06-28",
    priority: "high",
    completed: false,
  },
  {
    id: "5",
    title: "Étudier les contraintes du terrain pour Bureaux Panorama",
    projectName: "Bureaux Panorama",
    dueDate: "2023-07-05",
    priority: "medium",
    completed: false,
  },
  {
    id: "6",
    title: "Coordonner avec l'ingénieur structure pour École Futura",
    projectName: "École Futura",
    dueDate: "2023-07-10",
    priority: "high",
    completed: false,
  },
  {
    id: "7",
    title: "Analyser les devis des sous-traitants pour Hôtel Riviera",
    projectName: "Hôtel Riviera",
    dueDate: "2023-07-02",
    priority: "medium",
    completed: false,
  },
  {
    id: "8",
    title: "Finaliser les plans de plomberie pour Villa Moderna",
    projectName: "Villa Moderna",
    dueDate: "2023-06-29",
    priority: "low",
    completed: false,
  },
  {
    id: "9",
    title: "Valider les choix de matériaux pour Tour Horizon",
    projectName: "Tour Horizon",
    dueDate: "2023-07-08",
    priority: "medium",
    completed: false,
  },
  {
    id: "10",
    title: "Ajuster le planning prévisionnel pour Résidence Eterna",
    projectName: "Résidence Eterna",
    dueDate: "2023-06-26",
    priority: "high",
    completed: false,
  },
  {
    id: "11",
    title: "Mettre à jour les rendus 3D pour Villa Moderna",
    projectName: "Villa Moderna",
    dueDate: "2023-07-15",
    priority: "medium",
    completed: false,
  },
  {
    id: "12",
    title: "Finaliser le dossier administratif de Complexe Sportif Olympia",
    projectName: "Complexe Sportif Olympia",
    dueDate: "2023-07-03",
    priority: "high",
    completed: false,
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleCompleteTask = (id: string, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    ));
  };

  const handleCreateTask = () => {
    // Dans une application réelle, nous prendrions ici les données du formulaire
    // et les soumettrions à une API
    toast({
      title: "Tâche créée",
      description: "La nouvelle tâche a été créée avec succès",
    });
    setIsNewTaskSheetOpen(false);
  };

  // Filtrer les tâches pour différentes vues
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed);
  
  // Calcul des tâches en retard
  const overdueTasks = tasks.filter(task => {
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
              <Input placeholder="Rechercher une tâche..." className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les projets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les projets</SelectItem>
                  <SelectItem value="villa-moderna">Villa Moderna</SelectItem>
                  <SelectItem value="tour-horizon">Tour Horizon</SelectItem>
                  <SelectItem value="residence-eterna">Résidence Eterna</SelectItem>
                  <SelectItem value="centre-commercial">Centre Commercial Lumina</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Toutes les priorités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
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
            tasks={tasks} 
            title="Toutes les tâches" 
            onCompleteTask={handleCompleteTask}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <TaskList 
            tasks={pendingTasks} 
            title="Tâches à faire" 
            onCompleteTask={handleCompleteTask}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <TaskList 
            tasks={completedTasks} 
            title="Tâches terminées" 
            onCompleteTask={handleCompleteTask}
          />
        </TabsContent>
        
        <TabsContent value="overdue">
          <TaskList 
            tasks={overdueTasks} 
            title="Tâches en retard" 
            onCompleteTask={handleCompleteTask}
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
              <Input id="task-title" placeholder="Entrez le titre de la tâche" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-name">Projet associé</Label>
              <Select>
                <SelectTrigger id="project-name">
                  <SelectValue placeholder="Sélectionner un projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa-moderna">Villa Moderna</SelectItem>
                  <SelectItem value="tour-horizon">Tour Horizon</SelectItem>
                  <SelectItem value="residence-eterna">Résidence Eterna</SelectItem>
                  <SelectItem value="centre-commercial">Centre Commercial Lumina</SelectItem>
                  <SelectItem value="bureaux-panorama">Bureaux Panorama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Date d'échéance</Label>
              <Input id="due-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label>Priorité</Label>
              <RadioGroup defaultValue="medium">
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
              <Input id="task-description" placeholder="Description de la tâche" />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsNewTaskSheetOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateTask}>Créer la tâche</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
};

export default Tasks;
