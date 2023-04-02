import { useContext } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../user-context'
import CardWrapper from '../CardWrapper'
import MessagesSidebar from '../MessagesSidebar'
import styles from './index.module.scss'

export default function MessagesWrapper() {
  const { userId } = useParams()

  const location = useLocation()

  const ctx = useContext(UserContext)

  return (
    <CardWrapper style={{height: '100%', padding: 0}}>
      <div className={styles.main}>
        {
          ctx.chats.length === 0 && !userId ?
          <div className={styles.text}>Looks like you have no contacts yet.<br />You can find someone to chat with <Link to='/people' className={styles.link}>here</Link></div>
          :
          <>
            <MessagesSidebar />
            <div className={`${styles.wrapper} ${location.pathname === '/messages' ? 'd-none d-lg-block' : ''}`}>
              <Outlet />
            </div>
          </>
        }
      </div>
    </CardWrapper>
  )
}