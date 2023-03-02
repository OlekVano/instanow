import { useContext, useState } from 'react'
import { ModalContext } from '../../modal-context'
import { Post } from '../../types'
import { UserContext } from '../../user-context'
import Button from '../Button'
import CardWrapper from '../CardWrapper'
import CommentModal from '../CommentModal'
import Line from '../Line'
import Modal from '../Modal'
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
        <CommentModal onExit={closeCommentModal} />
      }
      <div className={styles.container}>
        <ProfileMedium profile={post.author} />
        <div className={styles.text}>{post.text}</div>
        <img src={post.picture} className={styles.image} />
      </div>
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
