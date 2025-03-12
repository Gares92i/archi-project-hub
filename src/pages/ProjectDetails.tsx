
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTasksByProjectId } from "@/components/services/taskService";
import { ProjectCardProps } from "@/components/ProjectCard";
import { Task } from "@/components/gantt/types";
import { useToast } from "@/hooks/use-toast";
import { projectsData } from "@/data/projectDetailsData";

// Import new components
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectSummaryCards from "@/components/project/ProjectSummaryCards";
import ProjectOverviewTab from "@/components/project/tabs/ProjectOverviewTab";
import ProjectTasksTab from "@/components/project/tabs/ProjectTasksTab";
import ProjectTeamTab from "@/components/project/tabs/ProjectTeamTab";
import ProjectDocumentsTab from "@/components/project/tabs/ProjectDocumentsTab";
import ProjectMilestonesTab from "@/components/project/tabs/ProjectMilestonesTab";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectCardProps | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      fetchProjectTasks(foundProject.id);
    } else {
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <ProjectHeader project={project} />
      
      <ProjectSummaryCards project={project} />
      
      <Tabs defaultValue="overview" className="mb-8" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="milestones">Jalons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ProjectOverviewTab projectId={project.id} />
        </TabsContent>
        
        <TabsContent value="tasks">
          <ProjectTasksTab tasks={tasks} projectId={project.id} />
        </TabsContent>
        
        <TabsContent value="team">
          <ProjectTeamTab />
        </TabsContent>
        
        <TabsContent value="documents">
          <ProjectDocumentsTab />
        </TabsContent>
        
        <TabsContent value="milestones">
          <ProjectMilestonesTab />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProjectDetails;
