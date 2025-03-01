
import { useState, useEffect, useCallback } from "react";
import { addDays, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Project, ChartTask, Task } from "./types";
import { toast } from "sonner";

export const useGanttData = (currentProject: Project) => {
  const [chartData, setChartData] = useState<ChartTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>(currentProject.tasks);

  const formatTasksForChart = useCallback((projectTasks: Task[]) => {
    return projectTasks.map(task => ({
      id: task.id,
      name: task.name,
      start: new Date(task.start).getTime(),
      end: new Date(task.end).getTime(),
      progress: task.progress,
      startPosition: 0,
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
    
    const formattedData = formatTasksForChart(tasks);
    setChartData(formattedData);
  }, [tasks, formatTasksForChart]);

  const updateTask = useCallback((taskId: string, newStart: Date, newEnd: Date) => {
    console.log("Updating task:", taskId, newStart, newEnd);
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

  return { chartData, updateTask };
};
