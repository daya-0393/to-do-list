'use client'

import { useState } from "react";
import Task from "./Task";
import './taskList.css'

const TasksList = ({tasks, onDelete, onEdit}) => {

  return (
    <div className="list-container">
      {tasks.map((task) => {
        if(task == undefined) {
          return;
        }
        return (
          <Task 
            text={task.name} 
            key={task.id} 
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
          />
        )
      })}
    </div>
  )
}

export default TasksList;