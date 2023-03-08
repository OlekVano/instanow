import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../user-context'
import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import ProfileSmall from '../ProfileSmall'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'

export default function MobileMenu() {
  const userCtx = useContext(UserContext)

  return (
    <div className={`d-block d-md-none ${styles.main}`}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SearchBar width='100%' />
          {
            !userCtx.currUser ? null :
            <Link to={`/profiles/${userCtx.currUser!.uid}`}>
              <ProfileSmall profile={userCtx.currProfile!} />
            </Link>
          }
        </div>
        <NavBar />
      </div>
    </div>
  )
}
