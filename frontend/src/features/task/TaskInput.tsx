import styles from "./TaskInput.module.css"
import Button from "@mui/material/Button"

import {
  fetchAsyncCreate,
  fetchAsyncUpdate,
  editTask,
  selectEditedTask,
} from "./taskSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

const TaskInput = () => {
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectEditedTask)

  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(
          editTask({
            id: 0,
            title: e.target.value,
            content: editedTask.content,
          }),
        )
      : dispatch(
          editTask({
            id: editedTask.id,
            title: e.target.value,
            content: editedTask.content,
          }),
        )
  }

  const handleInputContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(
          editTask({ id: 0, title: editedTask.title, content: e.target.value }),
        )
      : dispatch(
          editTask({
            id: editedTask.id,
            title: editedTask.title,
            content: e.target.value,
          }),
        )
  }

  const isDisabled =
    editedTask.title.length === 0 || editedTask.content.length === 0

  const createClicked = () => {
    dispatch(fetchAsyncCreate(editedTask))
    dispatch(editTask({ id: 0, title: "", content: "" }))
  }

  const updateClicked = () => {
    dispatch(fetchAsyncUpdate(editedTask))
    dispatch(editTask({ id: 0, title: "", content: "" }))
  }

  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handleInputTitleChange}
        placeholder="Please ipnut title"
      />
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.content}
        onChange={handleInputContentChange}
        placeholder="Please ipnut content"
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  )
}

export default TaskInput
