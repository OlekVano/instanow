import { useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../user-context'
import { getProfileById, getFollowedProfiles } from '../../utils'
import LeftColumn from '../LeftColumn'
import RightColumn from '../RightColumn'
import styles from './index.module.scss'

export default function PageWrapper() {
  const userCtx = useContext(UserContext)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(manageAccountChange, [userCtx.currUser])

  return (
    <div className={`container-xl`}>
      <div className={`row gx-5 ${styles.row}`}>
        <div className={`d-none d-md-block col-4 col-xl-3`}> 
          <div className={`sticky-top ${styles.stickyCol} ${styles.paddingTop}`} >
            <LeftColumn />
          </div>
        </div>
        <div className={`${styles.paddingTop} ${location.pathname === 'messages' ? 'col-9' : 'col-12 col-md-8 col-xl-6'}`}>
          <Outlet />
        </div>
        {
          location.pathname === 'messages' ? null :
          <div className={`col-3 d-none d-xl-block`}>
            <div className={`sticky-top ${styles.stickyCol} ${styles.paddingTop}`}>
              <RightColumn />
            </div>
          </div>
        }
      </div>
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
