import styles from './index.module.scss'
import { Comment, Profile, WithComments } from '../../types'
import ProfileSmall from '../ProfileSmall'
import { timestampToStr } from '../../utils'
import heartOutline from '../../assets/heart-outline.png'
import CommentsRender from '../CommentsRender'
import { useContext, useState } from 'react'
import CommentModal from '../CommentModal'
import { UserContext } from '../../user-context'

type Props = {
  comment: Comment,
  query?: number[],
  postId: string,
  updateComments: (text: string, query: number[]) => unknown
}

export default function CommentRender({ postId, comment, query=[], updateComments }: Props) {
  const [showCommentModal, setShowCommentModal] = useState(false)

  return (
    <div className={styles.main}>
      {
        showCommentModal ? <CommentModal postId={postId} query={query} onExit={closeCommentModal} onComment={onComment} />
        : null
      }
      <ProfileSmall profile={comment.author} timestamp={timestampToStr(comment.createdAt)} />
      <div className={styles.text}>{comment.text}</div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={heartOutline} className={styles.image} />
        </div>
        <div role='button' onClick={openCommentModal} className={styles.replyBtn}>Reply to this comment</div>
      </div>
      {
        comment.comments.length === 0 ? null :
        <div className={styles.commentsWrapper}>
          <CommentsRender postId={postId} comments={comment.comments} query={query} updateComments={updateComments}  />
        </div>
      }
    </div>
  )

  // **********************************

  function onComment(text: string) {
    updateComments(text, query)
  }

  function openCommentModal() {
    setShowCommentModal(true)
  }

  function closeCommentModal() {
    setShowCommentModal(false)
  }
}