import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

export default function ProfileSmall() {
  return (
    <div className={styles.main}>
      <ProfilePicture />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>Laura Fitscher</div>
        <div className={styles.tag}>@laurafitscher</div>
      </div>
    </div>
  )
}
