import Following from '../Following'
import NewMessages from '../NewMessages'
import styles from './index.module.scss'

export default function RightColumn() {
  return (
    <div className={styles.main}>
      <NewMessages />
      <Following />
    </div>
  )
}
