import { Comment } from '../../types'
import CommentRender from '../CommentRender'
import styles from './index.module.scss'

type Props = {
  comments: Comment[]
}

export default function CommentsRender({ comments }: Props) {
  return (
    <div className={styles.main}>
      {comments.map(function renderComment(comment, i) {
        return <CommentRender key={i} comment={comment} />
      })}
    </div>
  )
}
