import { Profile } from '../../types'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: Profile
}

export default function ProfileMedium({ profile }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='md' src={profile.profilePicture} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>{profile.username}</div>
        <div className={styles.tag}>{profile.tag}</div>
      </div>
    </div>
  )
}
