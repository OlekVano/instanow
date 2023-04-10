import Skeleton from 'react-loading-skeleton'
import { Profile, ProfileWithoutPosts } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile?: Profile | ProfileWithoutPosts,
  timestamp?: string
}

export default function ProfileMedium({ profile, timestamp=undefined }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='md' src={profile ? profile.profilePicture : undefined} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>{profile ? profile.username : <Skeleton/>}</div>
        <div className={styles.tag}>{profile && timestamp ? timestamp : profile ? profile.tag : <Skeleton/>}</div>
      </div>
    </div>
  )
}
