import Header from './components/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginSignUpWrapper from './components/LoginSignUpWrapper'
import LoginMenu from './components/LoginMenu'
import SignUpMenu from './components/SignUpMenu'
import { auth } from '../firebase-setup'
import { useEffect, useState } from 'react'
import PageWrapper from './components/PageWrapper'
import SettingsSection from './components/SettingsSection'
import { CurrentProfile } from './types'
import styles from './App.module.scss'
import { UserContext } from './user-context'
import ProfileSection from './components/ProfileSection'
import CreatePostModal from './components/CreatePostModal'
import { ModalContext } from './modal-context'
import PostSection from './components/PostSection'
import HomeSection from './components/HomeSection'
import MobileMenu from './components/MobileMenu'

function App() {
  const [currProfile, setCurrProfile] = useState<CurrentProfile | undefined>()
  const [currUser] = useAuthState(auth)
  const [modal, setModal] = useState()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <UserContext.Provider value={{
      currProfile: currProfile,
      currUser: currUser,
      setCurrProfile: setCurrProfile
    }}>
    <ModalContext.Provider value={{
      setModal: setModal
    }}>
      {
        modal == 'CREATE_POST' ?
        <CreatePostModal />
        : null
      }
      <Routes>
        {
          ['/login', '/sign-up'].map((path: string, i: number) => <Route path={path} key={i} element={<Header setShowMenu={setShowMenu} showMenu={showMenu} rightSideEmpty={true} />} />)
        }
        <Route path='*' element={<Header setShowMenu={setShowMenu} showMenu={showMenu} />} />
      </Routes>
      <div className={styles.contentContainer}>
        {
          showMenu ? <MobileMenu /> : null
        }
        <Routes>
          <Route path='/' element={<PageWrapper />}>
            <Route index element={<HomeSection />} />
            <Route path='/settings' element={<SettingsSection />} />
            <Route path='/profiles/:profileId' element={<ProfileSection />} />
            <Route path='/posts/:postId' element={<PostSection />} />
          </Route>
          <Route path='/' element={<LoginSignUpWrapper />}>
            <Route path='/login' element={<LoginMenu />} />
            <Route path='/sign-up' element={<SignUpMenu />} />
          </Route>
        </Routes>
      </div>
    </ModalContext.Provider>
    </UserContext.Provider>
  )
}

export default App
