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
import { useContext } from 'react'

type Props = {
  disabled?: boolean
}

export default function NavBar({ disabled=false }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const ctx = useContext(UserContext)

  return (
    <div>
      <NavButton disabled={disabled} func={() => {navigate('/')}} text={'Home'} image={house} selected={location.pathname === '/'} />
      <NavButton disabled={disabled} func={() => {navigate(`/profiles/${ctx.currUser?.uid}`)}} text={'Profile'} image={profile} selected={location.pathname === `/profiles/${ctx.currUser?.uid}`} />
      <NavButton disabled={disabled} func={() => {navigate('/messages')}} text={'Messages'} image={messages} selected={location.pathname.startsWith('/messages')} />
      <NavButton disabled={disabled} func={() => {navigate('/people')}} text={'People'} image={people} selected={location.pathname === '/people'} />
      <div style={{width: '80%', margin: '0 auto'}}>
        <Line />
      </div>
      <NavButton func={() => {navigate('/settings')}} text={'Settings'} image={settings} selected={location.pathname === '/settings'} />
      <NavButton func={handleSignOut} text={'Logout'} image={logout} selected={false} />
    </div>
  )

  // *************************

  function handleSignOut() {
    signOut(auth).then(function afterSignOut() {
      navigate('/login')
    })
    ctx.setCurrProfile(undefined)
  }
}