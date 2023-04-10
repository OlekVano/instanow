import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../user-context'
import ProfileBig from '../ProfileBig'
import styles from './index.module.scss'
import { addAuthorsToComments, getProfileById, sortByRecent } from '../../utils'
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
  }, [ctx.currUser, profileId])

  return (
    <div className={styles.main}>
      <CardWrapper>
        <ProfileBig profile={profile} buttons={ctx.currUser?.uid !== profileId} />
      </CardWrapper>
      {
        !profile ? <PostBig />
        :
        (sortByRecent(profile.posts) as PostWithoutAuthor[]).map(function renderPost(post: PostWithoutAuthor, i: number) {
          let postWithAuthor: Post = Object.assign({author: profile}, post)

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