import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileWithoutPosts } from '../../types'
import { UserContext } from '../../user-context'
import { getProfiles } from '../../utils'
import CardWrapper from '../CardWrapper'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'

export default function PeopleSection() {
  const [profiles, setProfiles] = useState<ProfileWithoutPosts[]>([])
  
  const userCtx = useContext(UserContext)

  useEffect(function fetchProfiles() {
    if (!userCtx.currUser) return
    getProfiles(userCtx.currUser).then(function updateProfiles(p) {
      if (p) setProfiles(p)
    })
  }, [userCtx.currUser])

  return (
    <CardWrapper>
      <div className={styles.main}>
        {
          profiles.map(function renderProfile(profile: ProfileWithoutPosts, i: number) {
            return (
              <div className={styles.profileWrapper}>
                <Link key={i} to={`/profiles/${profile.id}`}>
                  <ProfileMedium profile={profile} />
                </Link>
              </div>

            )

          })
        }
      </div>
    </CardWrapper>
  )
}
