import Circle from '../Circle'
import ProfileMessage from '../ProfileMessage'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

export default function Following() {
  return (
    <div className={styles.main}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Following</div>
        <Circle text='2' type={2} />
      </div>
      <div className={styles.container}>
        <ProfileSmall />
        <ProfileSmall />
      </div>
    </div>
  )
}
