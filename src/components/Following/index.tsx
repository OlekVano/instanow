import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CurrentProfile, Profile } from '../../types'
import Circle from '../Circle'
import ProfileSmall from '../ProfileSmall'
import styles from './index.module.scss'

type Props = {
  profile?: CurrentProfile
}

export default function Following({ profile }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Following</div>
        <Circle text={profile ? profile.followingIds.length.toString() : ''} type={2} />
      </div>
      <div className={styles.container}>
        {!profile ? <ProfileSmall />
        :
        profile.following.length !== 0 ? 
        profile.following.map(function renderFollowedProfile(p, i) {
          return (
            <Link to={`/profiles/${p.id}`} key={i}>
              <ProfileSmall profile={p} />
            </Link>
          )
        })
        : <div className={styles.text}>You can find someone interesting <Link to='/people' className={styles.link}>here</Link></div>
        }
      </div>
    </div>
  )
}
