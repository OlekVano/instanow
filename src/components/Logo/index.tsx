import styles from './index.module.scss'
import logo from '../../../public/logo.svg'

export default function Logo() {
  return (
    <div className={styles.main}>
      <img src={logo} className={styles.image} />
    </div>
  )
}