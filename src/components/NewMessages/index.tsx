import Circle from '../Circle'
import ProfileMessage from '../ProfileMessage'
import styles from './index.module.scss'

export default function NewMessages() {
  return (
    <div className={styles.main}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>New messages</div>
        <Circle text='2' />
      </div>
      <div className={styles.container}>
        <ProfileMessage />
        <ProfileMessage />
      </div>
    </div>
  )
}
