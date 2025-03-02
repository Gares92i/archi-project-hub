
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/TaskList";
import { Plus } from "lucide-react";
import { Task } from "@/components/gantt/types";
import { getAllTasks, toggleTaskCompletion } from "@/components/services/taskService";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskStats from "@/components/tasks/TaskStats";
import NewTaskSheet from "@/components/tasks/NewTaskSheet";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

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

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
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

      <TaskStats 
        pendingTasks={pendingTasks} 
        completedTasks={completedTasks} 
        highPriorityTasks={highPriorityTasks} 
        overdueTasks={overdueTasks} 
      />

      <Card className="mb-8">
        <CardContent className="pt-6">
          <TaskFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
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

      <NewTaskSheet 
        isOpen={isNewTaskSheetOpen} 
        onOpenChange={setIsNewTaskSheetOpen}
        onTaskCreated={handleTaskCreated}
      />
    </MainLayout>
  );
};

export default Tasks;
