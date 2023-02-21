import NavBar from '../NavBar'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

export default function LeftColumn() {
  return (
    <div className={styles.main}>
      <ProfileSmall />
      <NavBar />
    </div>
  )
}
