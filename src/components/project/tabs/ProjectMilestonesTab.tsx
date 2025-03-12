
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateFormatters";
import { projectMilestones } from "@/data/projectDetailsData";

const ProjectMilestonesTab = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Jalons</CardTitle>
            <CardDescription>Points clés du projet</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un jalon
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projectMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pl-8 pb-6 border-l ml-4 last:border-l-0 last:pb-0">
              <div className="absolute -left-3 top-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}>
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <Badge variant={milestone.completed ? "default" : "outline"}>
                    {milestone.completed ? "Terminé" : "À venir"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(milestone.date) < new Date() && !milestone.completed 
                    ? "En retard - " 
                    : ""}
                  {formatDate(milestone.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectMilestonesTab;
