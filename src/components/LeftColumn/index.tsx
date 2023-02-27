import { useContext } from 'react'
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
        <>
        <CardWrapper>
          <ProfileMedium profile={ctx.currProfile} />
        </CardWrapper>
        </>
      }
      <NavBar />
    </div>
  )
}
