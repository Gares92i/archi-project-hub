
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip, CustomBar } from "./ChartComponents";
import { ChartTask } from "./types";

interface GanttChartComponentProps {
  projectName: string;
  chartData: ChartTask[];
  dateRange: Date[];
}

const GanttChartComponent = ({ projectName, chartData, dateRange }: GanttChartComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{projectName} - Planning des tâches</CardTitle>
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
  );
};

export default GanttChartComponent;
