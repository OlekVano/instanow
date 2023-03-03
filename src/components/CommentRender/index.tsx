import styles from './index.module.scss'
import { Comment } from '../../types'
import ProfileSmall from '../ProfileSmall'
import { timestampToStr } from '../../utils'
import heartOutline from '../../assets/heart-outline.png'
import CommentsRender from '../CommentsRender'

type Props = {
  comment: Comment
}

export default function CommentRender({ comment }: Props) {
  return (
    <div className={styles.main}>
      <ProfileSmall profile={comment.author} timestamp={timestampToStr(comment.createdAt)} />
      <div className={styles.text}>{comment.text}</div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={heartOutline} className={styles.image} />
        </div>
        <div className={styles.replyBtn}>Reply to this comment</div>
      </div>
      {
        comment.comments.length === 0 ? null :
        <div className={styles.commentsWrapper}>
          <CommentsRender comments={comment.comments} />
        </div>
      }
    </div>
  )
}
