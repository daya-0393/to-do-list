import CircleIcon from "../icons/IconCircle";
import CheckIcon from "../icons/IconCheck";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import './task.css';

const Task = ({text, onDelete, onEdit}) => {
  return (
    <div className="task">
      <div className="row-item ">
        <div className='item-select'>
          <CircleIcon/>
        </div>
        {text}
        <div className='action-buttons'>
          <button onClick={onEdit}>
            <IconEdit/>
          </button>
          <button onClick={onDelete}>
            <IconDelete/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task;