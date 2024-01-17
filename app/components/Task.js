import IconCheck from "../icons/IconCheck";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import './task.css';

const Task = ({text, onDelete, onEdit, onSelection, completed}) => {

  return (
    <li className={`task ${completed ? 'completed' : ''}`}>
      <div className="task-bar">
        <div className="task-text">
          <span className='radio-icon' onClick={onSelection}>
            {completed &&
              <IconCheck/>
            }
          </span>
          <p>{text}</p>
        </div>
        <div className='action-buttons'>
          {!completed && 
            <button className="btn" onClick={onEdit}>
              <IconEdit/>
            </button>
          }
          <button className="btn" onClick={onDelete}>
            <IconDelete/>
          </button>
        </div>
      </div>
    </li>
  )
}

export default Task;