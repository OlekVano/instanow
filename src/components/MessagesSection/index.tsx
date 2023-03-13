import { Link } from 'react-router-dom'
import CardWrapper from '../CardWrapper'
import styles from './index.module.scss'
import gear from '../../assets/work-in-progress.png'

export default function MessagesSection() {
  return (
    <CardWrapper>
      <div className={styles.main}>
        <div className={styles.imageWrapper}>
          <img src={gear} className={styles.image} />
        </div>
        <div className={styles.text}>This page is under development</div>
        <Link className={styles.link} to='/'>Home</Link>
      </div>
    </CardWrapper>
  )
}
