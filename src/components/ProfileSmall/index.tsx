import { useEffect } from 'react'
import { Profile, ProfileWithoutPosts } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: ProfileWithoutPosts,
  timestamp?: string
}

export default function ProfileSmall({ profile, timestamp=undefined }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='s' src={profile.profilePicture} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>{profile.username}</div>
        <div className={styles.tag}>{timestamp ? timestamp : profile.tag}</div>
      </div>
    </div>
  )
}
