'use client'

import IconCircle from "./icons/IconCircle";
import IconAdd from "./icons/IconAdd";
import IconCheck from "./icons/IconCheck";
import TasksList from "./components/TaskList";
import { useRef, useState } from "react";
import './page.css'

export default function Home() {

  const today = new Date();
  const [taskList, setTaskList] = useState([]);
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

  return (
    <div className="container">
      <header className="header">
        <h1>My Day</h1>
        <h3>{today.toDateString()}</h3>
      </header>
      <main className="content">
        {taskList && 
          <TasksList tasks={taskList} 
            onDelete={(taskId) => deleteTask(taskId)}
            onEdit={(task) => updateTask(task)}
          />
        }
        <div className="row-item input-container">
          <IconCircle/>
          <input className="input" type='text' ref={input} onKeyDown={(e) => {
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
      </main>
    </div>
  )
}
