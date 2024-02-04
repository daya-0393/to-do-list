'use client'

import IconDownArrow from "../icons/IconDownArrow";
import IconRightArrow from "../icons/IconRightArrow";
import { useState, useContext, useEffect } from "react";
import Task from "./Task";
import TasksContext from "../context/Tasks/TasksContext";
import styles from './completedTasks.module.scss'

const CompletedTasks = ({tasks, onDelete, onSelection}) => {

  const [completedTaskShown, setCompletedTaskShown] = useState(true);
  const {
    completedTasks, 
    getCompletedTasks,
    deleteCompletedTask,
    addNewTask, 
    getPendingTasks,
    setSelectedTask
  } = useContext(TasksContext);


  useEffect(() => {
    getCompletedTasks();
  }, []);

  const deleteTask = (id) => {
    deleteCompletedTask(id);
    getCompletedTasks();
  }

  const resumeTask = (task) => {
    deleteCompletedTask(task.id);
    addNewTask({content: task.content});
    getPendingTasks();
    getCompletedTasks();
  }

  const toggleCompletedBtn = () => {
    setCompletedTaskShown(current => !current);
  }

  console.log('completed');

  return (

    <div className="completed-tasks">
      <button className={`btn ${styles.completedBtn}`} onClick={toggleCompletedBtn} aria-label="toggle completed tasks">
        {completedTaskShown ? 
          <IconDownArrow/> :
          <IconRightArrow/>
        }
        Completed
      </button>
      {completedTaskShown &&
        <ul>
          {completedTasks.map((task) => {
            if(task == undefined) {
              return;
            }
            return (
              <Task 
                text={task.content} 
                key={task.id} 
                onDelete={() => deleteTask(task.id)}
                onSelection={() => resumeTask(task)}
                completed
              />
            )
          })}
        </ul>
      }
    </div>
  )
}

export default CompletedTasks;