import { useContext } from 'react'
import { Link } from 'react-router-dom'
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
        {userCtx.currProfile?.following.length !== 0 ? 
        userCtx.currProfile?.following.map(function renderFollowedProfile(p, i) {
          return <ProfileSmall key={i} profile={p} />
        })
        : <div className={styles.text}>You can find someone interesting <Link to='/people' className={styles.link}>here</Link></div>
        }
      </div>
    </div>
  )
}
