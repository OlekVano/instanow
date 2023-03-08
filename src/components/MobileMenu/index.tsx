import { useContext } from 'react'
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
          <ProfileSmall profile={userCtx.currProfile!} />
        </div>
        <NavBar />
      </div>
    </div>
  )
}
