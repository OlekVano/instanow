import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../user-context'
import { getProfileById, getFollowedProfiles } from '../../utils'
import LeftColumn from '../LeftColumn'
import RightColumn from '../RightColumn'
import styles from './index.module.scss'

export default function PageWrapper() {
  const userCtx = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(manageAccountChange, [userCtx.currUser])

  return (
    <div className={`container-xl ${styles.container}`}>
      <LeftColumn />
      <Outlet />
      <RightColumn />
    </div>
  )

  // **************************************

  function manageAccountChange() {
    if (!userCtx.currUser) return
    getProfileById(userCtx.currUser.uid, userCtx.currUser).then(async function afterGotProfile(profile) {
      if (!profile) navigate('/settings')
      else userCtx.setCurrProfile(Object.assign({
        following: await getFollowedProfiles(userCtx.currUser!) || []
      }, profile))
    })
  }
}
