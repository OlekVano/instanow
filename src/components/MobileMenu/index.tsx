import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../user-context'
import NavBar from '../NavBar'
import ProfileMedium from '../ProfileMedium'
import ProfileSmall from '../ProfileSmall'
import SearchBar from '../SearchBar'
import styles from './index.module.scss'

type Props = {
  visible: boolean
}

export default function MobileMenu({ visible }: Props) {
  const userCtx = useContext(UserContext)

  return (
    <div className={`d-block d-md-none ${styles.main} ${visible ? styles.visible : ''}`}>
      <div className={`${styles.wrapper} ${visible ? styles.visible : ''}`}>
        <div className={styles.container}>
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
