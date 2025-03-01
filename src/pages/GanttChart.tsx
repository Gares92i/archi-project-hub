
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { projectsData } from "@/components/gantt/data";
import ProjectSelector from "@/components/gantt/ProjectSelector";
import GanttChartComponent from "@/components/gantt/GanttChartComponent";
import { useGanttData } from "@/components/gantt/useGanttData";

const GanttChart = () => {
  const [selectedProject, setSelectedProject] = useState(projectsData[0].id);
  
  const currentProject = projectsData.find(p => p.id === selectedProject) || projectsData[0];
  const { dateRange, chartData, updateTask } = useGanttData(currentProject);

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

        <GanttChartComponent 
          projectName={currentProject.name}
          chartData={chartData}
          dateRange={dateRange}
          onTaskUpdate={updateTask}
        />
      </div>
    </MainLayout>
  );
};

export default GanttChart;
