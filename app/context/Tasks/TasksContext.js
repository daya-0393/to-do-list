import { createContext } from "react";

const TasksContext = createContext({
  pendingTasks: [],
  completedTasks: [],
  getPendingTasks: () => {},
  addNewTask: (task) => {},
  deletePendingTask: (taskId) => {},
  updatePendingTask: (task) => {},
  getCompletedTasks: () => {},
  addCompletedTask: () => {},
  deleteCompletedTask: () => {},
  selectedTask: null,
  isEditionMode: null,
});

export default TasksContext;