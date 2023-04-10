import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileWithoutPosts } from '../../types'
import { UserContext } from '../../user-context'
import { getProfiles } from '../../utils'
import CardWrapper from '../CardWrapper'
import ProfileMedium from '../ProfileMedium'
import styles from './index.module.scss'
import Input from '../Input'
import Fuse from 'fuse.js'
import Skeleton from 'react-loading-skeleton'

export default function PeopleSection() {
  const [profiles, setProfiles] = useState<ProfileWithoutPosts[]>([])
  const [searchResults, setSearchResults] = useState<ProfileWithoutPosts[]>([])

  const userCtx = useContext(UserContext)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(function fetchProfiles() {
    if (!userCtx.currUser) return
    getProfiles(userCtx.currUser).then(function updateProfiles(p) {
      if (p) setProfiles(p)
    })
  }, [userCtx.currUser])

  return (
    <div className={styles.container}>
      <CardWrapper>
        <input type='text' className={styles.search} placeholder='Find someone...' ref={inputRef} onChange={search} />
      </CardWrapper>
      <CardWrapper style={{overflowY: 'auto'}}>
        <div className={styles.main}>
          {
            profiles.length === 0 ?
            [...Array(5)].map(function mapEmptyProfiles(_, i) {
              return (
                <div className={styles.profileWrapper} key={i}>
                  <ProfileMedium  />
                  <div className={styles.text}>
                    <Skeleton count={3} />
                  </div>
                </div>
              )
            })
            :
            searchResults.length === 0 ?
            profiles.map(function renderProfile(profile: ProfileWithoutPosts, i: number) {
              return (
                <Link className={styles.profileWrapper} key={i} to={`/profiles/${profile.id}`}>
                  <ProfileMedium profile={profile} />
                  <div className={styles.text}>
                    {profile.bio}
                  </div>
                </Link>
              )
            })
            :
            <>
              <div className={styles.resultsText}>{`${searchResults.length} results`}</div>
              {
                searchResults.map(function renderProfile(profile: ProfileWithoutPosts, i: number) {
                  return (
                    <Link className={styles.profileWrapper} key={i} to={`/profiles/${profile.id}`}>
                      <ProfileMedium profile={profile} />
                      <div className={styles.text}>
                        {profile.bio}
                      </div>
                    </Link>
                  )
                })
              }
            </>
          }
        </div>
      </CardWrapper>
    </div>
  )

  // ********************************

  function search(e: ChangeEvent<HTMLInputElement>) {
    const searchOptions = {
      keys: [
        'username',
        'tag',
        'bio',
      ]
    }

    const fuse = new Fuse(profiles, searchOptions)

    setSearchResults(fuse.search(e.target.value).map(function mapSearchResults(result) {
      return result.item
    }) )
  }
}
