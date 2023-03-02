import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post, Profile } from '../../types'
import { UserContext } from '../../user-context'
import { getPostById, getProfileById } from '../../utils'
import CardWrapper from '../CardWrapper'
import PostBig from '../PostBig'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'


export default function PostSection() {
  const { postId } = useParams()

  const ctx = useContext(UserContext)

  const [post, setPost] = useState<Post>()

  useEffect(fetchPost, [ctx.currUser])

  return (
    <div className={styles.main} >
    {
      !post ? null :
      <CardWrapper>
        <PostBig post={post} />
      </CardWrapper>
    }
    </div>
  )

  // ****************************************

  function fetchPost() {
    if (!ctx.currUser) return
    getPostById(postId!, ctx.currUser).then(function updatePost(p) {
      console.log(p)
      if (p) setPost(p)
    })
  }
}