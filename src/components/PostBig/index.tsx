import { useContext, useEffect, useState } from 'react'
import { Post } from '../../types'
import { UserContext } from '../../user-context'
import { timestampToStr } from '../../utils'
import Button from '../Button'
import CommentModal from '../CommentModal'
import CommentsSection from '../CommentsSection'
import Line from '../Line'
import ProfileMedium from '../ProfileMedium'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  post: Post
}

export default function PostBig({ post }: Props) {
  const userCtx = useContext(UserContext)
  
  const [showCommentModal, setShowCommentModal] = useState(false)

  return (
    <div className={styles.main}>
      {
        !showCommentModal ? null :
        <CommentModal postId={post.id} onExit={closeCommentModal} />
      }
      <div className={styles.container}>
        <ProfileMedium profile={post.author} timestamp={timestampToStr(post.createdAt)} />
        <div className={styles.text}>{post.text}</div>
        <img src={post.picture} className={styles.image} />
      </div>
      <CommentsSection comments={post.comments} />
      <Line />
      <div role='button' className={styles.commentInputContainer} onClick={openCommentModal}>
        <ProfilePicture src={userCtx.currProfile?.profilePicture} size='s' />
        <div className={styles.input}>
          Leave your comment...
        </div>
        <Button text='Comment' />
      </div>
    </div>
  )

  // **********************************

  function openCommentModal() {
    setShowCommentModal(true)
  }

  function closeCommentModal() {
    setShowCommentModal(false)
  }
}
