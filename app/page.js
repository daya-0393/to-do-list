'use client'

import IconCircle from "./icons/IconCircle";
import IconAdd from "./icons/IconAdd";
import IconCheck from "./icons/IconCheck";
import TasksList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";
import { useRef, useState } from "react";
import './page.css'

export default function Home() {

  const today = new Date();
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] =useState([]);
  const [inputAction, setInputAction] = useState("add");
  const [selectedTask, setSelectedTask] = useState({});
  const input = useRef();

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
    setCompletedTasks(completeTask.filter(t => t.id !== taskId));
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
    <div className="container">
      <header className="header">
        <h1>My Day</h1>
        <h3>{today.toDateString()}</h3>
      </header>
      <main className="main">
        <div className="list-container">
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
        <div className="input-container">
          <div className="row-item input-bar">
            <span><IconCircle/></span>
            <input className="input" type='text' ref={input} placeholder="Add a task" onKeyDown={(e) => {
              if(e.key === "Enter") {
                inputAction === 'add' ? addNewTask() : saveUpdatedTask()
              } 
            }}/>
            {inputAction === 'add' ? 
              <button onClick={addNewTask}>
                <IconAdd/>
              </button>
            : 
              <button onClick={saveUpdatedTask}>
                <IconCheck/>
              </button>
            }
          </div>
        </div>
      </main>
    </div>
  )
}
