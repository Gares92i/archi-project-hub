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

// No longer need DragState as dhtmlx-gantt handles this internally
