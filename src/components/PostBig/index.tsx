import { useContext } from 'react'
import { Post } from '../../types'
import { UserContext } from '../../user-context'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

type Props = {
  post: Post
}

export default function PostBig({ post }: Props) {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <ProfileMedium profile={post.author} />
      <div className={styles.text}>{post.text}</div>
      <img src={post.picture} className={styles.image} />
    </div>
  )
}
