import { useContext } from 'react'
import { Profile, ProfileWithoutPosts } from '../../types'
import { UserContext } from '../../user-context'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

type Props = {
  userId: string,
  profile: ProfileWithoutPosts
}

export default function MessagesHeader({ userId, profile }: Props) {
  const userCtx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <ProfileMedium profile={profile} />
    </div>
  )
}
