import IconCheck from "../icons/IconCheck";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import './task.css';

const Task = ({text, onDelete, onEdit, onSelection, completed}) => {

  return (
    <li className="task">
      <div className="row-item ">
        <div>
          <span className='radio-icon' onClick={onSelection}>
            {completed &&
              <IconCheck/>
            }
          </span>
          <span className="task-text">{text}</span>
        </div>
        <div className='action-buttons'>
          {!completed && 
            <button onClick={onEdit}>
              <IconEdit/>
            </button>
          }
          <button onClick={onDelete}>
            <IconDelete/>
          </button>
        </div>
      </div>
    </li>
  )
}

export default Task;