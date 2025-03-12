
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/TaskList";
import { Task } from "@/components/gantt/types";
import { useNavigate } from "react-router-dom";

interface ProjectTasksTabProps {
  tasks: Task[];
  projectId: string;
}

const ProjectTasksTab = ({ tasks, projectId }: ProjectTasksTabProps) => {
  const navigate = useNavigate();
  
  const handleNavigateToTasksPage = () => {
    navigate(`/tasks?project=${projectId}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Tâches</CardTitle>
            <CardDescription>Gérez les tâches du projet</CardDescription>
          </div>
          <Button onClick={handleNavigateToTasksPage}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle tâche
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TaskList 
          tasks={tasks} 
          title="Toutes les tâches"
          onCompleteTask={() => {}} 
          onDeleteTask={() => {}}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectTasksTab;
