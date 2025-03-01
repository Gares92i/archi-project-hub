
import { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { projectsData } from "@/components/gantt/data";
import ProjectSelector from "@/components/gantt/ProjectSelector";
import { useGanttData } from "@/components/gantt/useGanttData";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { toast } from "sonner";

const GanttChart = () => {
  const [selectedProject, setSelectedProject] = useState(projectsData[0].id);
  const ganttContainer = useRef<HTMLDivElement>(null);
  
  const currentProject = projectsData.find(p => p.id === selectedProject) || projectsData[0];
  const { chartData, updateTask } = useGanttData(currentProject);

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
        { name: "text", label: "Task name", width: 200, tree: true },
        { name: "start_date", label: "Start date", width: 130, align: "center" },
        { name: "duration", label: "Duration", width: 60, align: "center" },
        { name: "progress", label: "Progress", width: 80, align: "center", template: function (task) {
          return Math.round(task.progress * 100) + "%";
        }}
      ];

      // Initialize gantt
      gantt.init(ganttContainer.current);
      
      // Convert our data format to dhtmlx-gantt format
      const tasks = {
        data: chartData.map(task => ({
          id: task.id,
          text: task.name,
          start_date: new Date(task.start).toISOString().split('T')[0],
          duration: task.duration,
          progress: task.progress
        }))
      };
      
      gantt.parse(tasks);
      
      // Handle task updates
      gantt.attachEvent("onAfterTaskDrag", (id, mode) => {
        const task = gantt.getTask(id);
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);
        updateTask(id, startDate, endDate);
        toast.success("Task updated successfully");
      });
      
      gantt.attachEvent("onTaskDblClick", (id) => {
        const task = gantt.getTask(id);
        toast.info(`Task: ${task.text}, Progress: ${Math.round(task.progress * 100)}%`);
        return true;
      });
      
      // Clean up
      return () => {
        gantt.clearAll();
      };
    }
  }, [chartData, updateTask]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Planning Gantt</h1>
          <ProjectSelector 
            projects={projectsData} 
            selectedProjectId={selectedProject} 
            onProjectChange={setSelectedProject} 
          />
        </div>

        <div className="bg-white rounded-lg shadow border p-4 h-[600px]">
          <h2 className="text-xl font-semibold mb-4">{currentProject.name}</h2>
          <div ref={ganttContainer} className="w-full h-[500px]" />
        </div>
      </div>
    </MainLayout>
  );
};

export default GanttChart;
