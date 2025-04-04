import "./App.css"
import styles from "./App.module.css"
import { FaSignInAlt } from "react-icons/fa"
import TaskInput from "./features/task/TaskInput"
import TaskList from "./features/task/TaskList"
import TaskDetails from "./features/task/TaskDetail"
import Header from "./features/login/Header"

const App = () => {
  const Logout = () => {
    localStorage.removeItem("localJWT")
    window.location.href = "/"
  }
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button onClick={Logout} className={styles.signBtn}>
          <FaSignInAlt />
        </button>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetails />
      </div>
    </div>
  )
}

export default App
