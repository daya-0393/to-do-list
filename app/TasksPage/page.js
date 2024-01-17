'use client'

import IconCircle from "../icons/IconCircle";
import IconAdd from "../icons/IconAdd";
import IconCheck from "../icons/IconCheck";
import TasksList from "../components/TaskList";
import Navbar from "../components/Navbar";
import CompletedTasks from "../components/CompletedTasks";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import PulseLoader from 'react-spinners/PulseLoader';
import styles from './tasks.module.css';


const TasksPage = () => {

  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] =useState([]);
  const [inputAction, setInputAction] = useState("add");
  const [selectedTask, setSelectedTask] = useState({});
  const [loading, setLoading] = useState(true);
  const {user} = UserAuth();
  const input = useRef();

  useEffect(() => {
    user ? setLoading(false) : setLoading(true);
  }, [user]);

  const addNewTask = () => {
    if(input.current.value !== ""){
      if(taskList.length == 0){
        setTaskList([...taskList, {name: input.current.value, id: 1}]);
      }else{
        setTaskList([...taskList, {name: input.current.value, id: taskList.length + 1}]);
      }
      input.current.value = "";
    }
  }

  const deleteTask = (taskId) => {
    setTaskList(taskList.filter(task => task.id !== taskId));
  }
  
  const deleteCompletedTask = (taskId) => {
    setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
  }

  const updateTask = (task) => {
    setSelectedTask(task.id);
    input.current.value = task.name;
    setInputAction("edit");
  }

  const saveUpdatedTask = () => {
    if(input.current.value !== ""){
      const updatedList = taskList.map((task) => {
        if(task.id === selectedTask){
           task.name = input.current.value;
        }
        return task;
      });
      setTaskList(updatedList);
      setInputAction("add");
      input.current.value = "";
    }
  }

  const completeTask = (task) => {
    setCompletedTasks([...completedTasks, task]);
    setTaskList(taskList.filter(t => t.id !== task.id));
  }

  const resumeTask = (task) => {
    setTaskList([...taskList, task]);
    setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
  }

  return (
    <div className={styles.background}>
      {loading ?
        <PulseLoader loading={loading}/>
      : 
        <div className={styles.container}>
          <header className={styles.header}>
            <Navbar/>
          </header>
          <main className={styles.main}>
            <div className={styles.listContainer}>
              {taskList &&
                <TasksList
                  tasks={taskList}
                  completedTasks={completedTasks}
                  onDelete={(taskId) => deleteTask(taskId)}
                  onEdit={(task) => updateTask(task)}
                  onSelection={(task) => completeTask(task)}
                />
              }
              {completedTasks && completedTasks.length > 0 &&
                <CompletedTasks
                  tasks={completedTasks}
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
                    inputAction === 'add' ? addNewTask() : saveUpdatedTask()
                  }
                }} />
                {inputAction === 'add' ?
                  <button className="btn" onClick={addNewTask}>
                    <IconAdd />
                  </button>
                  :
                  <button className="btn" onClick={saveUpdatedTask}>
                    <IconCheck />
                  </button>
                }
              </div>
            </div>
          </main>
        </div>
      }
    </div>
  )
}

export default TasksPage;