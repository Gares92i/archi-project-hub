
import { Task } from "@/components/gantt/types";
import { tasksData } from "./mockDatabase";

// Récupérer toutes les tâches
export const getAllTasks = async (): Promise<Task[]> => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => resolve(tasksData), 300);
  });
};

// Récupérer les tâches par ID de projet
export const getTasksByProjectId = async (projectId: string): Promise<Task[]> => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    const filteredTasks = projectId ? 
      tasksData.filter(task => task.projectId === projectId) : 
      tasksData;
    setTimeout(() => resolve(filteredTasks), 300);
  });
};
