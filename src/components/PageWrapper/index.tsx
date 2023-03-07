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
      <div className={`row ${styles.row}`}>
        <div className='col-3'> 
          <div className={`sticky-top ${styles.stickyCol}`} >
            <LeftColumn />
          </div>
        </div>
        <Outlet />
        {
          location.pathname === 'messages' ? null :
          <div className='col-3'>
            <div className={`sticky-top ${styles.stickyCol}`}>
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
