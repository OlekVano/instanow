import Circle from '../Circle'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

export default function ProfileMessage() {
  return (
    <div className={styles.main}>
      <ProfilePicture size='s' />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>Laura Fitscher</div>
        <div className={styles.tag}>@laurafitscher</div>
      </div>
      <div style={{marginLeft: 'auto'}}>
        <Circle text='1' />
      </div>
    </div>
  )
}
