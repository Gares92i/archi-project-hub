
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectSelector from "@/components/gantt/ProjectSelector";
import { useGanttData } from "@/components/gantt/useGanttData";
import { Task, Project } from "@/components/gantt/types";
import { getAllTasks } from "@/components/services/taskService";
import { toast } from "sonner";
import BigScheduler from "@/components/scheduler/BigScheduler";

const GanttChart = () => {
  const defaultProject: Project = { id: "", name: "All Projects", tasks: [] };
  const { tasks, loading, refreshTasks } = useGanttData(defaultProject);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching all tasks...");
        const allTasks = await getAllTasks();
        console.log("Tasks fetched:", allTasks);
        
        // Extract unique projects from tasks
        const projectMap = new Map<string, Project>();
        
        allTasks.forEach(task => {
          if (task.projectId) {
            if (!projectMap.has(task.projectId)) {
              projectMap.set(task.projectId, {
                id: task.projectId,
                name: task.projectName || `Project ${task.projectId}`,
                tasks: []
              });
            }
            projectMap.get(task.projectId)?.tasks.push(task);
          }
        });
        
        setAllProjects(Array.from(projectMap.values()));
        setFilteredTasks(allTasks);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        toast.error("Erreur lors du chargement des tâches");
        setIsLoading(false);
      }
    };
    
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (tasks) {
      console.log("Tasks updated, filtering...", tasks);
      if (selectedProject) {
        setFilteredTasks(tasks.filter(task => task.projectId === selectedProject));
      } else {
        setFilteredTasks(tasks);
      }
    }
  }, [tasks, selectedProject]);

  const handleTaskUpdate = async (
    taskId: string, 
    newStart: Date, 
    newEnd: Date
  ) => {
    try {
      const task = filteredTasks.find(t => t.id === taskId);
      if (task) {
        // Implementation for task update
        toast.success("Tâche mise à jour avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      toast.error("Échec de la mise à jour de la tâche");
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Planning</h1>
            <p className="text-muted-foreground">
              Visualisez et gérez le planning des projets
            </p>
          </div>
          <ProjectSelector 
            projects={allProjects}
            selectedProjectId={selectedProject}
            onProjectChange={setSelectedProject}
          />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p>Chargement du planning...</p>
          </div>
        ) : (
          <div className="border rounded-lg bg-white p-4" style={{ height: '700px', overflow: 'auto' }}>
            {filteredTasks.length > 0 ? (
              <BigScheduler tasks={filteredTasks} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Aucune tâche à afficher</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GanttChart;
