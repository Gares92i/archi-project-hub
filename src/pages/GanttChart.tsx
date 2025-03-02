
import { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { projectsData } from "@/components/gantt/data";
import ProjectSelector from "@/components/gantt/ProjectSelector";
import { useGanttData } from "@/components/gantt/useGanttData";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { Task } from "@/components/gantt/types";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

const GanttChart = () => {
  const [selectedProject, setSelectedProject] = useState(projectsData[0].id);
  const ganttContainer = useRef<HTMLDivElement>(null);
  
  const currentProject = projectsData.find(p => p.id === selectedProject) || projectsData[0];
  const { chartData, tasks, updateTask, loading, refreshTasks } = useGanttData(currentProject);

  useEffect(() => {
    if (ganttContainer.current) {
      gantt.config.date_format = "%Y-%m-%d";
      gantt.config.drag_progress = true;
      gantt.config.drag_resize = true;
      gantt.config.drag_move = true;
      gantt.config.drag_links = false;
      
      // Configure scales
      gantt.config.scale_unit = "day";
      gantt.config.step = 1;
      gantt.config.date_scale = "%d %M";
      
      gantt.config.columns = [
        { name: "text", label: "Nom de la tâche", width: 200, tree: true },
        { name: "start_date", label: "Date de début", width: 130, align: "center" },
        { name: "duration", label: "Durée (jours)", width: 100, align: "center" },
        { name: "progress", label: "Progression", width: 80, align: "center", template: function (task) {
          return Math.round(task.progress * 100) + "%";
        }}
      ];

      // Initialize gantt
      gantt.init(ganttContainer.current);
      
      // Handle task updates - use custom event handlers to ensure changes are saved
      gantt.attachEvent("onAfterTaskDrag", (id, mode) => {
        const task = gantt.getTask(id);
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);
        
        // Call our updateTask function to persist the changes
        updateTask(id, startDate, endDate);
        toast.success("Tâche mise à jour avec succès");
        return true;
      });
      
      // Clean up
      return () => {
        gantt.clearAll();
      };
    }
  }, [updateTask]);

  // Refresh the chart when tasks change
  useEffect(() => {
    if (ganttContainer.current && tasks.length > 0) {
      const ganttTasks = {
        data: chartData.map(task => ({
          id: task.id,
          text: task.name,
          start_date: new Date(task.start).toISOString().split('T')[0],
          duration: task.duration,
          progress: task.progress
        }))
      };
      
      gantt.clearAll();
      gantt.parse(ganttTasks);
    }
  }, [tasks, chartData]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Planning Gantt</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refreshTasks} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <ProjectSelector 
              projects={projectsData} 
              selectedProjectId={selectedProject} 
              onProjectChange={setSelectedProject} 
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-4 h-[600px]">
          <h2 className="text-xl font-semibold mb-4">{currentProject.name}</h2>
          {loading ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Aucune tâche pour ce projet</p>
            </div>
          ) : (
            <div ref={ganttContainer} className="w-full h-[500px]" />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GanttChart;
