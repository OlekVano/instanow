import { useEffect } from 'react'
import { Comment } from '../../types'
import CommentsRender from '../CommentsRender'
import styles from './index.module.scss'

type Props = {
  comments: Comment[],
  postId: string,
  updateComments: (text: string, query: number[]) => unknown
}

export default function CommentsSection({ comments, postId, updateComments }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>Comments</div>
      <div className={styles.commentsWrapper}>
        <CommentsRender postId={postId} comments={comments} updateComments={updateComments} />
      </div>
    </div>
  )
}
