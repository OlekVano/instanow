import { useState } from 'react'
import { Comment } from '../../types'
import CommentRender from '../CommentRender'
import styles from './index.module.scss'

type Props = {
  comments: Comment[],
  query?: number[],
  postId: string,
  updateComments: (text: string, query: number[]) => unknown
}

export default function CommentsRender({ postId, comments, query=[], updateComments }: Props) {
  return (
    <div className={styles.main}>
      {comments.map(function renderComment(comment, i) {
        return <CommentRender postId={postId} key={i} comment={comment} query={[...query, i]} updateComments={updateComments} />
      })}
    </div>
  )
}
