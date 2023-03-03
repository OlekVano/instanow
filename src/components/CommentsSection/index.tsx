import { useEffect } from 'react'
import { Comment } from '../../types'
import CommentsRender from '../CommentsRender'
import styles from './index.module.scss'

type Props = {
  comments: Comment[]
}

export default function CommentsSection({ comments }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>Comments</div>
      <CommentsRender comments={comments} />
    </div>
  )
}
