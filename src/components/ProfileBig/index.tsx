import { useContext } from 'react'
import { Profile } from '../../types'
import { UserContext } from '../../user-context'
import Button from '../Button'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: Profile,
  buttons: boolean
}

export default function ProfileBig({ profile, buttons }: Props) {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ProfilePicture size='xl' src={profile.profilePicture} />
        <div className={styles.container2}>
          <div>
            <div className={styles.username}>{profile.username}</div>
            <div className={styles.tag}>{profile.tag}</div>
          </div>
          {
            !buttons ? null :
            <div className={styles.buttonsContainer}>
              <Button text='Unfollow' width='150px' type={2}  />
              <Button text='Message' width='150px'  />
            </div>
          }
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Posts</div>
          <div className={styles.statValue}>{profile.posts.length}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Followers</div>
          <div className={styles.statValue}>{profile.followers.length}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Following</div>
          <div className={styles.statValue}>{profile.following.length}</div>
        </div>
      </div>
      <div className={styles.bio}>{profile.bio}</div>
    </div>
  )
}
