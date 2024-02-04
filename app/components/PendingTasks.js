'use client'

import { useState, useContext, useEffect } from "react";
import TasksContext from "../context/Tasks/TasksContext";
import Task from "./Task";
import './pendingTasks.scss'

const PendingTasks = ({ inputRef }) => {

  const {
    pendingTasks,
    getPendingTasks,
    deletePendingTask,
    addCompletedTask,
    setIsEditionMode,
    setSelectedTask,
    getCompletedTasks,
  } = useContext(TasksContext);

  const deleteTask = (id) => {
    deletePendingTask(id);
    getPendingTasks();
  }

  const updateTask = (task) => {
    setSelectedTask(task.id);
    inputRef.current.value = task.content;
    setIsEditionMode(true);
  }

  const completeTask = (task) => {
    deletePendingTask(task.id);
    addCompletedTask({ content: task.content });
    getPendingTasks();
    getCompletedTasks();
  }

  return (
    <ul>
      {pendingTasks.map((task) => {
        if (task == undefined) {
          return null;
        }
        return (
          <Task
            text={task.content}
            key={task.id}
            onDelete={() => deleteTask(task.id)}
            onEdit={() => updateTask(task)}
            onSelection={() => completeTask(task)}
          />
        )
      })}
    </ul>
  )
}

export default PendingTasks;