
import { Task } from "@/components/gantt/types";
import { tasksData, updateTasksData } from "./mockDatabase";
import { toast } from "sonner";

// Ajouter une nouvelle tâche
export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const newTask: Task = {
    ...task,
    id: Date.now().toString(), // Génération d'un ID unique
  };
  
  updateTasksData([...tasksData, newTask]);
  toast.success(`Tâche créée avec succès`);
  
  return newTask;
};

// Mettre à jour une tâche existante
export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const taskIndex = tasksData.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    throw new Error(`Tâche avec l'ID ${id} non trouvée`);
  }
  
  const updatedTask = { ...tasksData[taskIndex], ...updates };
  updateTasksData([
    ...tasksData.slice(0, taskIndex),
    updatedTask,
    ...tasksData.slice(taskIndex + 1)
  ]);
  
  toast.success(`Tâche mise à jour avec succès`);
  return updatedTask;
};

// Supprimer une tâche
export const deleteTask = async (id: string): Promise<boolean> => {
  const taskIndex = tasksData.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    throw new Error(`Tâche avec l'ID ${id} non trouvée`);
  }
  
  updateTasksData([
    ...tasksData.slice(0, taskIndex),
    ...tasksData.slice(taskIndex + 1)
  ]);
  
  toast.success(`Tâche supprimée avec succès`);
  return true;
};
