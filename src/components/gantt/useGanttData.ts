
import { useState, useEffect, useCallback } from "react";
import { addDays, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Project, ChartTask, Task } from "./types";

export const useGanttData = (currentProject: Project) => {
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<ChartTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>(currentProject.tasks);

  const formatTasksForChart = useCallback((projectTasks: Task[], dates: Date[]) => {
    return projectTasks.map(task => ({
      id: task.id,
      name: task.name,
      start: new Date(task.start).getTime(),
      end: new Date(task.end).getTime(),
      progress: task.progress,
      startPosition: dates.findIndex(d => 
        d.toISOString().split('T')[0] === new Date(task.start).toISOString().split('T')[0]
      ),
      duration: Math.ceil((new Date(task.end).getTime() - new Date(task.start).getTime()) / (1000 * 60 * 60 * 24)) + 1
    }));
  }, []);

  useEffect(() => {
    // Reset the tasks when the current project changes
    setTasks(currentProject.tasks);
  }, [currentProject]);

  useEffect(() => {
    if (!tasks.length) {
      setChartData([]);
      return;
    }
    
    const startDates = tasks.map(t => new Date(t.start));
    const endDates = tasks.map(t => new Date(t.end));
    
    const earliestDate = new Date(Math.min(...startDates.map(d => d.getTime())));
    const latestDate = new Date(Math.max(...endDates.map(d => d.getTime())));
    
    const rangeStart = startOfWeek(addDays(earliestDate, -7), { weekStartsOn: 1 });
    const rangeEnd = endOfWeek(addDays(latestDate, 7), { weekStartsOn: 1 });
    
    const dates = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
    setDateRange(dates);
    
    const formattedData = formatTasksForChart(tasks, dates);
    setChartData(formattedData);
  }, [tasks, formatTasksForChart]);

  const updateTask = useCallback((taskId: string, newStart: Date, newEnd: Date) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              start: newStart.toISOString().split('T')[0], 
              end: newEnd.toISOString().split('T')[0] 
            } 
          : task
      )
    );
  }, []);

  return { dateRange, chartData, updateTask };
};
