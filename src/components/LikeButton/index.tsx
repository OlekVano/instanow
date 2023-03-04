import { useContext, useState } from 'react'
import { UserContext } from '../../user-context'
import styles from './index.module.scss'
import heartOutline from '../../assets/heart-outline.png'
import heartFilled from '../../assets/heart-filled.png'

type Props = {
  likes: string[],
  postId: string,
  query: number[]
}

export default function LikeButton({ likes, postId, query }: Props) {
  const userCtx = useContext(UserContext)

  const [liked, setLiked] = useState(likes.includes(userCtx.currUser!.uid))
  const [nLikes, setNLikes] = useState(likes.length)

  return (
    <div role='button' className={styles.main} onClick={manageButtonClick}>
      <img className={styles.image} src={liked ? heartFilled : heartOutline} />
      <div className={styles.nLikes}>{nLikes > 0 ? nLikes : ''}</div>
    </div>
  )

  // ******************************

  async function manageButtonClick() {
    const json = JSON.stringify({
      query: query
    })

    // If post currently like, then dislike. Else like.
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/${liked ? 'dislike' : 'like'}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await userCtx.currUser?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json
    })

    if (res.status === 200) {
      setNLikes(nLikes + (liked ? -1 : 1))
      setLiked(!liked)
    }
    else alert(`Error: ${res.statusText}`)
  }
}
