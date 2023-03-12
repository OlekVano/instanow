import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Comment, Post, Profile, WithComments } from '../../types'
import { UserContext } from '../../user-context'
import { timestampToStr } from '../../utils'
import Button from '../Button'
import CommentModal from '../CommentModal'
import CommentsSection from '../CommentsSection'
import LikeButton from '../LikeButton'
import Line from '../Line'
import ProfileMedium from '../ProfileMedium'
import ProfilePicture from '../ProfilePicture'
import TextButton from '../TextButton'
import styles from './index.module.scss'

type Props = {
  post: Post
}

export default function PostBig({ post }: Props) {
  const userCtx = useContext(UserContext)
  
  const [showCommentModal, setShowCommentModal] = useState(false)

  const [comments, setComments] = useState(post.comments)

  return (
    <div className={styles.main}>
      {
        !showCommentModal ? null :
        <CommentModal onComment={onComment} postId={post.id} onExit={closeCommentModal} query={[]} />
      }
      <div className={styles.container}>
        <Link to={`/profiles/${post.authorId}`}>
          <ProfileMedium profile={post.author} timestamp={timestampToStr(post.createdAt)} />
        </Link>
        {
          post.text ? <div className={styles.text}>{post.text}</div> : null
        }
        {
          post.picture ? <Link to={`/posts/${post.id}`}><img src={post.picture} className={styles.image} /></Link> : null
        }
        <div className={styles.postButtonsContainer}>
          <LikeButton postId={post.id} likes={post.likes} query={[]} />
        </div>
      </div>
      {
        comments.length === 0 ? null : <CommentsSection updateComments={updateComments} postId={post.id} comments={comments} />
      }
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

  function onComment(text: string) {
    updateComments(text, [])
  }

  function updateComments(text: string, query: number[]) {
    const newComments = [...comments]
    addComment(newComments, text, query)
    setComments(newComments)
  }

  function addComment(comments: Comment[], text: string, query: number[]) {
    if (query.length === 0) {
      comments.push({
        author: userCtx.currProfile as Profile,
        authorId: userCtx.currUser?.uid,
        comments: [],
        createdAt: Date.now(),
        text: text,
        likes: []
      } as Comment)
    }
    else {
      addComment(comments[query[0]].comments, text, query.slice(1))
    }
  }

  function openCommentModal() {
    setShowCommentModal(true)
  }

  function closeCommentModal() {
    setShowCommentModal(false)
  }
}
