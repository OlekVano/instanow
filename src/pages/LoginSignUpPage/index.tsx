import styles from './index.module.scss'
import { Outlet, Route } from 'react-router-dom'

export default function AccountPage() {
  return (
    <div className={styles.main}>
      <div className={styles.background}></div>
      <Outlet />
    </div>
  )
}
