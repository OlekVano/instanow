import { Outlet } from 'react-router-dom'
import LeftColumn from '../LeftColumn'
import RightColumn from '../RightColumn'
import styles from './index.module.scss'

export default function PageWrapper() {
  return (
    <div className={`container-xl ${styles.container}`}>
      <LeftColumn />
      <Outlet />
      <RightColumn />
    </div>
  )
}
