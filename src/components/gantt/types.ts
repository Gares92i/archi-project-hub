
export interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
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

// dhtmlx-gantt handles drag state internally now
