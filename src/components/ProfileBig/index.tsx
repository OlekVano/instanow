import { useContext } from 'react'
import { Profile } from '../../types'
import { UserContext } from '../../user-context'
import Button from '../Button'
import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  profile: Profile,
  buttons: boolean
}

export default function ProfileBig({ profile, buttons }: Props) {
  const ctx = useContext(UserContext)

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ProfilePicture size='xl' src={profile.profilePicture} />
        <div className={styles.container2}>
          <div>
            <div className={styles.username}>{profile.username}</div>
            <div className={styles.tag}>{profile.tag}</div>
          </div>
          {
            !buttons ? null :
            <div className={styles.buttonsContainer}>
              {
                ctx.currProfile?.followingIds.includes(profile.id) ?
                <Button text='Unfollow' func={unfollow} width='150px' type={2}  /> :
                <Button text='Follow' func={follow} width='150px' />
              }
              
              <Button text='Message' width='150px'  />
            </div>
          }
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Posts</div>
          <div className={styles.statValue}>{profile.posts.length}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Followers</div>
          <div className={styles.statValue}>{profile.followersIds.length}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statTitle}>Following</div>
          <div className={styles.statValue}>{profile.followingIds.length}</div>
        </div>
      </div>
      <div className={styles.bio}>{profile.bio}</div>
    </div>
  )

  // ***************************

  async function follow() {
    if (!ctx.currUser || !ctx.currProfile) return
    const token = await ctx.currUser.getIdToken()
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${profile.id}/follow`, {headers: new Headers({'Authorization': `Bearer ${token}`}), method: 'POST'})
    if (res.status !== 200) return

    let newCurrProfile = {...ctx.currProfile}

    if (ctx.currProfile?.followingIds.includes(profile.id)) return

    newCurrProfile.following.push(profile)
    newCurrProfile.followingIds.push(profile.id)

    ctx.setCurrProfile(newCurrProfile)
  }

  async function unfollow() {
    if (!ctx.currUser || !ctx.currProfile) return
    const token = await ctx.currUser.getIdToken()
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${profile.id}/unfollow`, {headers: new Headers({'Authorization': `Bearer ${token}`}), method: 'POST'})
    if (res.status !== 200) return

    let newCurrProfile = {...ctx.currProfile}
    
    if (!ctx.currProfile?.followingIds.includes(profile.id)) return

    newCurrProfile.following = newCurrProfile.following.filter(function filterFollowedProfiles(followedProfile) {return followedProfile.id !== profile.id})
    newCurrProfile.followingIds = newCurrProfile.followingIds.filter(function filterFollowedIds(followedId) {return followedId !== profile.id})

    ctx.setCurrProfile(newCurrProfile)
  }
}
