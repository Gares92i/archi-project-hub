import { Task } from "@/components/TaskList";

export const getTasksByProjectId = async (projectId: string): Promise<Task[]> => {
  // Simulate an API call to fetch tasks by project ID
  const response = await fetch(`/api/projects/${projectId}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks = await response.json();
  return tasks;
};