import { useContext, useEffect, useState } from 'react'
import { Post } from '../../types'
import { UserContext } from '../../user-context'
import { getPosts, sortByRecent } from '../../utils'
import CardWrapper from '../CardWrapper'
import PostBig from '../PostBig'
import Share from '../Share'
import styles from './index.module.scss'

export default function HomeSection() {
  const userCtx = useContext(UserContext)

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(function fetchPosts() {
    if (!userCtx.currUser) return
    getPosts(userCtx.currUser).then(function updatePosts(posts) {
      if (posts) setPosts(posts)
    })
  }, [userCtx.currUser])

  return (
    <div className={styles.main}>
      <CardWrapper>
        <Share />
      </CardWrapper>
      <>
        {
          posts.length === 0 ?
          <CardWrapper style={{padding: 0}}>
            <PostBig />
          </CardWrapper>
          :
          (sortByRecent(posts) as Post[]).map(function renderPost(post, i) {
            return (
              <CardWrapper key={i} style={{padding: 0}}>
                <PostBig post={post} />
              </CardWrapper>
            )
          })
        }
      </>
    </div>
  )
}
