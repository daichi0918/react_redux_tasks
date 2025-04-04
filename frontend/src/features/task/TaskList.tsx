import { useEffect } from "react"
import styles from "./TaskList.module.css"
import TaskItem from "./TaskItem"

import { fetchAsyncProf } from "../login/loginSlice"
import { selectTasks, fetchAsyncGet } from "./taskSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const TaskList = () => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet())
      await dispatch(fetchAsyncProf())
    }
    fetchTaskProf()
  }, [dispatch])

  return (
    <div>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
