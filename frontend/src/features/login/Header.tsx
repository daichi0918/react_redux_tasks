import { useAppSelector } from "../../app/hooks"
import styles from "./Header.module.css"
import { selectProfile } from "./loginSlice"

const Header = () => {
  const profile = useAppSelector(selectProfile)
  return (
    <div className={styles.header}>
      <h3>{profile.email}</h3>
      <h1>Today's task</h1>
    </div>
  )
}

export default Header
