import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from "recharts";
import { format, addDays, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

const projectsData = [
  {
    id: "1",
    name: "Résidence Les Ormes",
    tasks: [
      { id: "1-1", name: "Conception", start: "2023-08-01", end: "2023-09-15", progress: 100 },
      { id: "1-2", name: "Permis de construire", start: "2023-09-10", end: "2023-11-20", progress: 80 },
      { id: "1-3", name: "Terrassement", start: "2023-11-15", end: "2023-12-15", progress: 60 },
      { id: "1-4", name: "Fondations", start: "2023-12-10", end: "2024-01-15", progress: 40 },
      { id: "1-5", name: "Gros œuvre", start: "2024-01-10", end: "2024-03-15", progress: 10 },
      { id: "1-6", name: "Second œuvre", start: "2024-03-10", end: "2024-05-30", progress: 0 },
    ]
  },
  {
    id: "2",
    name: "Tour Horizon",
    tasks: [
      { id: "2-1", name: "Études préliminaires", start: "2023-06-15", end: "2023-08-30", progress: 100 },
      { id: "2-2", name: "Conception détaillée", start: "2023-08-15", end: "2023-11-30", progress: 90 },
      { id: "2-3", name: "Autorisations", start: "2023-11-15", end: "2024-03-20", progress: 70 },
      { id: "2-4", name: "Construction phase 1", start: "2024-03-15", end: "2024-07-30", progress: 20 },
      { id: "2-5", name: "Construction phase 2", start: "2024-07-15", end: "2024-12-30", progress: 0 },
    ]
  },
  {
    id: "3",
    name: "Éco-quartier Rivière",
    tasks: [
      { id: "3-1", name: "Planification urbaine", start: "2023-07-01", end: "2023-10-15", progress: 100 },
      { id: "3-2", name: "Études environnementales", start: "2023-10-01", end: "2024-01-30", progress: 85 },
      { id: "3-3", name: "Infrastructure", start: "2024-01-15", end: "2024-05-30", progress: 45 },
      { id: "3-4", name: "Construction des logements", start: "2024-05-15", end: "2025-02-28", progress: 10 },
    ]
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="font-semibold">{data.name}</p>
        <p>Début: {format(new Date(data.start), 'dd MMM yyyy', { locale: fr })}</p>
        <p>Fin: {format(new Date(data.end), 'dd MMM yyyy', { locale: fr })}</p>
        <p>Progression: {data.progress}%</p>
      </div>
    );
  }
  return null;
};

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  const progress = payload.progress || 0;
  
  const progressWidth = (width * progress) / 100;
  
  return (
    <g>
      <Rectangle 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill="#e0e0e0" 
        radius={[4, 4, 4, 4]}
      />
      <Rectangle 
        x={x} 
        y={y} 
        width={progressWidth} 
        height={height} 
        fill="#3182CE" 
        radius={progress === 100 ? [4, 4, 4, 4] : [4, 0, 0, 4]}
      />
    </g>
  );
};

const GanttChart = () => {
  const [selectedProject, setSelectedProject] = useState(projectsData[0].id);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const currentProject = projectsData.find(p => p.id === selectedProject) || projectsData[0];

  useEffect(() => {
    if (!currentProject.tasks.length) return;
    
    const startDates = currentProject.tasks.map(t => new Date(t.start));
    const endDates = currentProject.tasks.map(t => new Date(t.end));
    
    const earliestDate = new Date(Math.min(...startDates.map(d => d.getTime())));
    const latestDate = new Date(Math.max(...endDates.map(d => d.getTime())));
    
    const rangeStart = startOfWeek(addDays(earliestDate, -7), { weekStartsOn: 1 });
    const rangeEnd = endOfWeek(addDays(latestDate, 7), { weekStartsOn: 1 });
    
    const dates = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
    setDateRange(dates);
    
    const formattedData = currentProject.tasks.map(task => ({
      name: task.name,
      start: new Date(task.start).getTime(),
      end: new Date(task.end).getTime(),
      progress: task.progress,
      startPosition: dates.findIndex(d => 
        d.toISOString().split('T')[0] === new Date(task.start).toISOString().split('T')[0]
      ),
      duration: Math.ceil((new Date(task.end).getTime() - new Date(task.start).getTime()) / (1000 * 60 * 60 * 24)) + 1
    }));
    
    setChartData(formattedData);
  }, [selectedProject, currentProject]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Planning Gantt</h1>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Sélectionner un projet" />
            </SelectTrigger>
            <SelectContent>
              {projectsData.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentProject.name} - Planning des tâches</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[800px] h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                      barSize={20}
                    >
                      <XAxis 
                        type="number" 
                        domain={[0, dateRange.length]} 
                        tickFormatter={(tick) => {
                          if (tick < dateRange.length) {
                            return format(dateRange[tick], 'dd/MM', { locale: fr });
                          }
                          return '';
                        }}
                        ticks={dateRange.filter((_, i) => i % 7 === 0).map((_, i) => i * 7)}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="duration" 
                        stackId="a" 
                        fill="#8884d8" 
                        shape={<CustomBar />}
                        background={{ fill: 'transparent' }}
                        barSize={20}
                        minPointSize={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Aucune tâche trouvée pour ce projet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GanttChart;
