import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

export default function LeftColumn() {
  return (
    <div className={styles.main}>
      <div className={styles.profileWrapper}>
        <ProfileMedium />
      </div>
      <NavBar />
    </div>
  )
}
