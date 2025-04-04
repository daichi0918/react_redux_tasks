import styles from "./TaskItem.module.css"

import { BsTrash } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"

import {
  fetchAsyncDelete,
  selectTask,
  editTask,
  type taskType,
} from "./taskSlice"
import { useAppDispatch } from "../../app/hooks"

interface TaskItemProps {
  task: taskType
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch()

  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <button
          onClick={() => dispatch(fetchAsyncDelete(task.id))}
          className={styles.taskIcon}
        >
          <BsTrash />
        </button>

        <button
          onClick={() => dispatch(editTask(task))}
          className={styles.taskIcon}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  )
}

export default TaskItem
