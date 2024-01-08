'use client'

import IconDownArrow from "../icons/IconDownArrow";
import IconRightArrow from "../icons/IconRightArrow";
import { useState } from "react";
import Task from "./Task";
import './taskList.css'

const TasksList = ({tasks, onDelete, onEdit, onSelection}) => {

  return (
    <>
      <ul>
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
              onSelection={() => onSelection(task)}
            />
          )
        })}
      </ul>
    </>
  )
}

export default TasksList;