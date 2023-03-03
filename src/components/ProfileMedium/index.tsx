import { Profile, ProfileWithoutPosts } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: Profile | ProfileWithoutPosts,
  timestamp?: string
}

export default function ProfileMedium({ profile, timestamp=undefined }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='md' src={profile.profilePicture} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>{profile.username}</div>
        <div className={styles.tag}>{timestamp ? timestamp : profile.tag}</div>
      </div>
    </div>
  )
}
