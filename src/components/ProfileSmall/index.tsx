import { useEffect } from 'react'
import { Profile, ProfileWithoutPosts } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'
import Skeleton from 'react-loading-skeleton'

type Props = {
  profile?: ProfileWithoutPosts,
  timestamp?: string
}

export default function ProfileSmall({ profile, timestamp }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='s' src={profile && profile.profilePicture} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>{profile ? profile.username : <Skeleton />}</div>
        <div className={styles.tag}>{profile && timestamp ? timestamp : profile ? profile.tag : <Skeleton />}</div>
      </div>
    </div>
  )
}
