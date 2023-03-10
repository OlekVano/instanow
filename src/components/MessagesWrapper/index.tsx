import { Outlet } from 'react-router-dom'
import CardWrapper from '../CardWrapper'
import MessagesSidebar from '../MessagesSidebar'
import styles from './index.module.scss'

export default function MessagesWrapper() {
  return (
    <CardWrapper style={{height: '100%', padding: 0}}>
      <div className={styles.main}>
        <MessagesSidebar />
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </div>
    </CardWrapper>
  )
}