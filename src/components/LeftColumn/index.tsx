import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContextType } from '../../types'
import { UserContext } from '../../user-context'
import CardWrapper from '../CardWrapper'
import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

export default function LeftColumn() {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      {
        !ctx?.currProfile ? null : 
        <Link to={`/profiles/${ctx.currUser?.uid}`}>
          <CardWrapper>
            <ProfileMedium profile={ctx.currProfile} />
          </CardWrapper>
        </Link>
      }
      <div className={styles.navbarContainer}>
        <NavBar />
      </div>
    </div>
  )
}
