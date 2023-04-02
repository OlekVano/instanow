import { useContext } from 'react'
import { Profile, ProfileWithoutPosts } from '../../types'
import { UserContext } from '../../user-context'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import arrow from '../../assets/arrow.png'
import ProfileSmall from '../ProfileSmall'
import ProfilePicture from '../ProfilePicture'
import ProfileTiny from '../ProfileTiny'

type Props = {
  userId: string,
  profile: ProfileWithoutPosts
}

export default function MessagesHeader({ userId, profile }: Props) {
  const userCtx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <Link to='/messages' className='d-block d-lg-none'>
        <img src={arrow} className={styles.arrow} />
      </Link>
      <div className='d-none d-md-block'>
        <ProfileMedium profile={profile} />
      </div>
      <div className='d-block d-md-none'>
        <ProfileTiny profile={profile} />
      </div>
    </div>
  )
}
