'use client'

import IconCircle from "../icons/IconCircle";
import IconAdd from "../icons/IconAdd";
import IconCheck from "../icons/IconCheck";
import PendingTasks from "../components/PendingTasks";
import Navbar from "../components/Navbar";
import CompletedTasks from "../components/CompletedTasks";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/Themes/ThemeContext";
import PulseLoader from 'react-spinners/PulseLoader';
import { TasksProvider } from "../context/Tasks/TasksProvider";
import TasksContext from "../context/Tasks/TasksContext";
import styles from './tasks.module.scss';


const TasksPage = () => {

  const [loading, setLoading] = useState(true);
  const input = useRef();
  const {
    pendingTasks,
    completedTasks, 
    getPendingTasks, 
    addNewTask, 
    isEditionMode, 
    setIsEditionMode, 
    updatePendingTask, 
    getCompletedTasks,
    selectedTask, 
    error} = useContext(TasksContext);

  useEffect(() => {
    getPendingTasks();
  }, []);
  
  useEffect(() => {
    getCompletedTasks();
  }, []);
 
  const onAddNewTask = () => {
    if(input.current.value !== ""){
      addNewTask({content: input.current.value});
      input.current.value = "";
      getPendingTasks();
    }
  }

  const saveUpdatedTask = () => {
    if(input.current.value !== ""){
      updatePendingTask({
        id: selectedTask,
        content: input.current.value
      });
      setIsEditionMode(false);
      input.current.value = "";
      getPendingTasks();
    }
  }

  return (
    <div className="tasks-container">
      <Suspense fallback={<div className="centered"><PulseLoader loading={loading}/></div>}>
        <div className={styles.tasksInner}>
          <header className={styles.header}>
            <Navbar/>
          </header>
          <main className={styles.main}>
            <div className={styles.listContainer}>
              {pendingTasks && pendingTasks.length > 0 &&
                <PendingTasks
                  inputRef={input}
                  onSelection={(task) => completeTask(task)}
                />
              }
              {completedTasks && completedTasks.length > 0 &&
                <CompletedTasks
                  onDelete={(taskId) => deleteCompletedTask(taskId)}
                  onSelection={(task) => resumeTask(task)}
                />
              }
            </div>
            <div className={styles.inputContainer}>
              <div className={`task-bar ${styles.inputBar} `}>
                <span><IconCircle /></span>
                <input className={styles.input} type='text' ref={input} placeholder="Add a task" onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    !isEditionMode ? onAddNewTask() : saveUpdatedTask()
                  }
                }} />
                {!isEditionMode ?
                  <button className="btn" onClick={onAddNewTask} aria-label="add new task">
                    <IconAdd />
                  </button>
                  :
                  <button className="btn" onClick={saveUpdatedTask} aria-label="save edited task">
                    <IconCheck />
                  </button>
                }
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </div>
  )
}

export default TasksPage;