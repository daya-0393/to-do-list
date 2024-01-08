'use client'

import IconDownArrow from "../icons/IconDownArrow";
import IconRightArrow from "../icons/IconRightArrow";
import { useState } from "react";
import Task from "./Task";
import './completedTasks.css'

const CompletedTasks = ({tasks, onDelete, onSelection}) => {

  const [completedTaskShown, setCompletedTaskShown] = useState(true);

  const toggleCompletedBtn = () => {
    setCompletedTaskShown(current => !current);
  }

  return (

    <>
      <button className="completed-btn" onClick={toggleCompletedBtn}>
        {completedTaskShown ? 
          <IconDownArrow/> :
          <IconRightArrow/>
        }
        Completed
      </button>
      {completedTaskShown &&
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
                onSelection={() => onSelection(task)}
                completed
              />
            )
          })}
        </ul>
      }
    </>
  )
}

export default CompletedTasks;