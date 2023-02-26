import styles from './index.module.scss'
import NavButton from '../NavButton'
import house from '../../assets/home.png'
import profile from '../../assets/profile.png'
import messages from '../../assets/messages.png'
import people from '../../assets/people.png'
import settings from '../../assets/settings.png'
import logout from '../../assets/logout.png'
import Line from '../Line'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase-setup'
import { UserContext } from '../../user-context'

export default function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <UserContext.Consumer>
      {function renderFromContext(ctx) {
        return (
          <div className={styles.main}>
            <NavButton func={() => {navigate('/')}} text={'Home'} image={house} selected={location.pathname === '/'} roundedTop={true} />
            <NavButton func={() => {navigate(`/profile/${ctx.currUser?.uid}`)}} text={'Profile'} image={profile} selected={location.pathname === `/profile/${ctx.currUser?.uid}`} />
            <NavButton func={() => {navigate('/messages')}} text={'Messages'} image={messages} selected={location.pathname === '/messages'} />
            <NavButton func={() => {navigate('/people')}} text={'People'} image={people} selected={location.pathname === '/people'} />
            <div style={{width: '80%', margin: '0 auto'}}>
              <Line />
            </div>
            <NavButton func={() => {navigate('/settings')}} text={'Settings'} image={settings} selected={location.pathname === '/settings'} />
            <NavButton func={handleSignOut} text={'Logout'} image={logout} selected={false} />
          </div>
        )
      }}
    </UserContext.Consumer>
  )

  // *************************

  function handleSignOut() {
    signOut(auth).then(function afterSignOut() {
      navigate('/login')
    })
  }
}