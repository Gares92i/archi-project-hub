
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GanttChartComponent from "@/components/gantt/GanttChartComponent";
import ProjectSelector from "@/components/gantt/ProjectSelector";
import { useGanttData } from "@/components/gantt/useGanttData";
import { Task } from "@/components/gantt/types";
import { updateTask } from "@/components/services/taskService";
import { toast } from "sonner";

const GanttChart = () => {
  const { tasks, isLoading, error } = useGanttData();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks) {
      if (selectedProject) {
        setFilteredTasks(tasks.filter(task => task.projectId === selectedProject));
      } else {
        setFilteredTasks(tasks);
      }
    }
  }, [tasks, selectedProject]);

  const handleTaskUpdate = async (
    taskId: string, 
    startDate: string, 
    endDate: string,
    task: Task
  ) => {
    try {
      // Make sure to pass all required arguments: taskId, startDate, endDate, and progress
      await updateTask(taskId, startDate, endDate, task.progress || 0);
      toast.success("Tâche mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      toast.error("Échec de la mise à jour de la tâche");
    }
  };

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Erreur de chargement des données</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Planning Gantt</h1>
            <p className="text-muted-foreground">
              Visualisez et gérez le planning des projets
            </p>
          </div>
          <ProjectSelector 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>
        
        <GanttChartComponent 
          tasks={filteredTasks} 
          isLoading={isLoading}
          onTaskUpdate={handleTaskUpdate}
        />
      </div>
    </MainLayout>
  );
};

export default GanttChart;
