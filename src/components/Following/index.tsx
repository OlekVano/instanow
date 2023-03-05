import { useContext } from 'react'
import { UserContext } from '../../user-context'
import Circle from '../Circle'
import ProfileMessage from '../ProfileMessage'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

export default function Following() {
  const userCtx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Following</div>
        <Circle text={userCtx.currProfile!.followingIds.length.toString()} type={2} />
      </div>
      <div className={styles.container}>
        {userCtx.currProfile?.following.map(function renderFollowedProfile(p, i) {
          return <ProfileSmall key={i} profile={p} />
        })}
      </div>
    </div>
  )
}
