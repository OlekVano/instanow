import { Outlet } from 'react-router-dom'
import LeftColumn from '../../components/LeftColumn'
import RightColumn from '../../components/RightColumn'
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
