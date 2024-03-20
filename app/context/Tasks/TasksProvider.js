import TasksContext from "./TasksContext";
import { useState } from "react";
import { ref, push, get, set, remove, update } from "firebase/database";
import { db } from "../../firebase/config";

export const TasksProvider = ({children}) => {

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditionMode, setIsEditionMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState();
  const $localStorage = globalThis.window?.localStorage;
  const userId = localStorage.getItem('userId');

  //path reference to "pending" collection in db
  const pendingTasksRef = ref(db, `tasks/${userId}/pending`);

  //path reference to "completed" collection in db
  const completedTasksRef = ref(db, `tasks/${userId}/completed`);

  //Pending tasks functions
  const getPendingTasks = async () => {
    const tasksArray = [];
    get(pendingTasksRef)
    .then((snapshot) => {
      if(snapshot.exists()){
        for(let taskId in snapshot.val()){
          tasksArray.push({
            id: taskId,
            content: snapshot.val()[taskId].content
          });
        }
      }else{
        console.log("no data");
      }
      setPendingTasks(tasksArray);
    }).catch((error) => {
      console.log(error);
    })
  }

  const addNewTask = async (newTask) => {
    const newTaskRef = push(pendingTasksRef);
    try{
      await set(newTaskRef, newTask);
    }catch(error){
      console.log(error);
    }
  }

  const deletePendingTask = async (taskId) => {
    const deletedTaskRef = `tasks/${userId}/pending/${taskId}`;
    try{
      remove(ref(db, deletedTaskRef));
    }catch(error){
      console.log(error);
    }
  }
  
  const updatePendingTask = async (task) => {
    const editedTaskRef = `tasks/${userId}/pending/${task.id}`;
    try{
      update(ref(db, editedTaskRef), {content: task.content});
    }catch(error){
      console.log(error);
    }
  }

  //COMPLETED TASKS FUNCTIONS
  const getCompletedTasks = async () => {
    const tasksArray = [];
    get(completedTasksRef)
    .then((snapshot) => {
      if(snapshot.exists()){
        for(let taskId in snapshot.val()){
          tasksArray.push({
            id: taskId,
            content: snapshot.val()[taskId].content
          });
        }
      }else{
        console.log("no data");
      }
      setCompletedTasks(tasksArray);
    }).catch((error) => {
      console.log(error);
    })
  }

  const addCompletedTask = async (newTask) => {
    const newTaskRef = push(completedTasksRef)
    try{
      await set(newTaskRef, newTask);
    }catch(error){
      console.log(error);
    }
  }

  const deleteCompletedTask = async (taskId) => {
    const deletedTaskRef = `tasks/${userId}/completed/${taskId}`;
    try{
      remove(ref(db, deletedTaskRef));
    }catch(error){
      console.log(error);
    }
  }


  return (
    <TasksContext.Provider value={{
      pendingTasks, 
      getPendingTasks, 
      addNewTask, 
      deletePendingTask, 
      updatePendingTask, 
      completedTasks,
      getCompletedTasks,
      addCompletedTask,
      deleteCompletedTask,
      selectedTask, 
      setSelectedTask, 
      isEditionMode, 
      setIsEditionMode}}
    >
      {children}
    </TasksContext.Provider>
  )
}