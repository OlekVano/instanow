import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../user-context'
import ProfileBig from '../ProfileBig'
import styles from './index.module.scss'
import { addAuthorsToComments, getProfileById } from '../../utils'
import { Post, PostWithoutAuthor, Profile } from '../../types'
import CardWrapper from '../CardWrapper'
import Share from '../Share'
import PostBig from '../PostBig'

export default function ProfileSection() {
  const { profileId } = useParams()
  const [profile, setProfile] = useState<Profile>()

  const ctx = useContext(UserContext)

  useEffect(function fetchProfile() {
    if (!ctx.currUser) return
    getProfileById(profileId!, ctx.currUser).then(function updateProfile(p) {
      if (p) setProfile(p)
    })
  }, [ctx.currUser])

  if (!profile) return null
  return (
    <div className={styles.main}>
      <CardWrapper>
        <ProfileBig profile={profile} buttons={ctx.currUser?.uid !== profileId} />
      </CardWrapper>
      {
        ctx.currUser?.uid !== profileId ? null :
        <CardWrapper>
          <Share />
        </CardWrapper>
      }
      {
        profile.posts.map(function renderPost(post: PostWithoutAuthor, i: number) {
          let postWithAuthor: Post = Object.assign({}, post, {
            author: profile,
            comments: addAuthorsToComments(post.comments, profile)
          })

          return (
            <CardWrapper key={i} style={{padding: 0}}>
              <PostBig post={postWithAuthor} />
            </CardWrapper>
          )
        })
      }
    </div>
  )
}