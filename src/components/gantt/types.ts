
export interface Task {
  id: string;
  title: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  projectId?: string;
  projectName?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface ChartTask {
  id: string;
  name: string;
  start: number;
  end: number;
  progress: number;
  startPosition: number;
  duration: number;
}
