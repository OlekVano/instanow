import { useEffect } from 'react'
import { Profile, ProfileWithoutPosts } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: ProfileWithoutPosts,
}

export default function ProfileTiny({ profile }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='s' src={profile.profilePicture} />
      <div className={styles.nameContainer}>
        <div className={styles.name}>{profile.username}</div>
      </div>
    </div>
  )
}
