import { useAppSelector } from "../../app/hooks"
import styles from "./TaskDetails.module.css"
import { selectSelectedTask } from "./taskSlice"

const TaskDetails = () => {
  const selectedTask = useAppSelector(selectSelectedTask)
  return (
    <div className={styles.details}>
      {selectedTask.title && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Content </p>
          <h3>{selectedTask.content}</h3>
        </>
      )}
    </div>
  )
}

export default TaskDetails
