import IconCheck from "../icons/IconCheck";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import styles from './task.module.scss';
import { useContext } from "react";
import TasksContext from "../context/Tasks/TasksContext";


const Task = ({text, completed, onDelete, onEdit, onSelection}) => {

  

  return (
    <li className={`${styles.task} ${styles[completed ? 'completed' : '']}`}>
      <div className={styles.taskBar}>
        <div className={styles.taskText}>
          <span className={styles.radioIcon} onClick={onSelection}>
            {completed &&
              <IconCheck/>
            }
          </span>
          <p style={completed ? {textDecoration: 'line-through', textDecorationColor: '#595959'}: {textDecoration: 'none'}}>
            {text}
          </p>
        </div>
        <div className='action-buttons'>
          {!completed && 
            <button className="btn" onClick={onEdit} aria-label="edit task">
              <IconEdit/>
            </button>
          }
          <button className="btn" onClick={onDelete} aria-label="delete task">
            <IconDelete/>
          </button>
        </div>
      </div>
    </li>
  )
}

export default Task;