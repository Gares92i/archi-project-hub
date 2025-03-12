
import { Task } from "@/components/gantt/types";
import { updateTask } from "./taskMutations";

// Mettre à jour le statut de complétion d'une tâche
export const toggleTaskCompletion = async (id: string, completed: boolean): Promise<Task> => {
  return updateTask(id, { completed });
};

// Mettre à jour les dates d'une tâche (pour le Gantt)
export const updateTaskDates = async (id: string, startDate: Date, endDate: Date): Promise<Task> => {
  // Format the dates to ISO string and extract the date part
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];
  
  return updateTask(id, { 
    start,
    end,
    dueDate: end
  });
};
