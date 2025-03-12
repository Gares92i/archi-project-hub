
import { Building, MapPin, Calendar, Users } from "lucide-react";
import { ProjectCardProps } from "@/components/ProjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/utils/dateFormatters";
import { projectStats } from "@/data/projectDetailsData";

interface ProjectSummaryCardsProps {
  project: ProjectCardProps;
}

const ProjectSummaryCards = ({ project }: ProjectSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Détails du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Localisation</p>
                <p className="font-medium">{project.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Période</p>
                <p className="font-medium">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Équipe</p>
                <p className="font-medium">{project.teamSize} membres</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-muted-foreground">Budget utilisé</p>
                <p className="text-sm font-medium">{Math.round(projectStats.budgetUsed / projectStats.budgetTotal * 100)}%</p>
              </div>
              <Progress value={Math.round(projectStats.budgetUsed / projectStats.budgetTotal * 100)} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-medium text-lg">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(projectStats.budgetTotal)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dépensé</p>
                <p className="font-medium text-lg">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(projectStats.budgetUsed)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="text-sm font-medium">{projectStats.timelineProgress}%</p>
              </div>
              <Progress value={projectStats.timelineProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="border rounded-lg p-2 text-center">
                <p className="text-green-600 font-medium">{projectStats.tasksCompleted}</p>
                <p className="text-xs text-muted-foreground">Complétées</p>
              </div>
              <div className="border rounded-lg p-2 text-center">
                <p className="text-blue-600 font-medium">{projectStats.tasksInProgress}</p>
                <p className="text-xs text-muted-foreground">En cours</p>
              </div>
              <div className="border rounded-lg p-2 text-center">
                <p className="text-gray-600 font-medium">{projectStats.tasksTodo}</p>
                <p className="text-xs text-muted-foreground">À faire</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSummaryCards;
