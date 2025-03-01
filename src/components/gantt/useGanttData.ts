
import { useState, useEffect } from "react";
import { addDays, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Project, ChartTask } from "./types";

export const useGanttData = (currentProject: Project) => {
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<ChartTask[]>([]);

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
  }, [currentProject]);

  return { dateRange, chartData };
};
