import styles from './index.module.scss'
import { Comment, Profile, WithComments } from '../../types'
import ProfileSmall from '../ProfileSmall'
import { timestampToStr } from '../../utils'
import heartOutline from '../../assets/heart-outline.png'
import CommentsRender from '../CommentsRender'
import { useContext, useState } from 'react'
import CommentModal from '../CommentModal'
import { UserContext } from '../../user-context'
import LikeButton from '../LikeButton'
import TextButton from '../TextButton'
import { Link } from 'react-router-dom'

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
      <Link to={`/profiles/${comment.authorId}`}>
        <ProfileSmall profile={comment.author} timestamp={timestampToStr(comment.createdAt)} />
      </Link>
      <div className={styles.text}>{comment.text}</div>
      <div className={styles.container}>
        <LikeButton postId={postId} likes={comment.likes} query={query} />
        <TextButton text='Reply to this comment' func={openCommentModal} />
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
