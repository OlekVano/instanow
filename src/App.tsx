import Header from './components/Header'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginSignUpWrapper from './components/LoginSignUpWrapper'
import LoginMenu from './components/LoginMenu'
import SignUpMenu from './components/SignUpMenu'
import { auth } from '../firebase-setup'
import { useEffect, useState } from 'react'
import PageWrapper from './components/PageWrapper'
import SettingsSection from './components/SettingsSection'
import { Chat, CurrentProfile } from './types'
import styles from './App.module.scss'
import { UserContext } from './user-context'
import ProfileSection from './components/ProfileSection'
import CreatePostModal from './components/CreatePostModal'
import { ModalContext } from './modal-context'
import PostSection from './components/PostSection'
import HomeSection from './components/HomeSection'
import MobileMenu from './components/MobileMenu'
import MessagesSection from './components/MessagesSection'
import PeopleSection from './components/PeopleSection'
import MessagesWrapper from './components/MessagesWrapper'
import MessagesRoom from './components/MessagesRoom'
import { sleep } from './utils'

function App() {
  const [currProfile, setCurrProfile] = useState<CurrentProfile | undefined>()
  const [currUser] = useAuthState(auth)
  const [modal, setModal] = useState()
  const [showMenu, setShowMenu] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  const [chats, setChats] = useState<Chat[]>([])

  const location = useLocation()

  useEffect(managePageChange, [location.pathname])
  useEffect(manageShowMenuChange, [showMenu])

  return (
    <UserContext.Provider value={{
      currProfile: currProfile,
      currUser: currUser,
      setCurrProfile: setCurrProfile,
      chats: chats,
      setChats: setChats
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
          ['/login', '/sign-up'].map((path: string, i: number) => <Route path={path} key={i} element={<Header closeMenu={closeMenu} openMenu={openMenu} showMenu={showMenu} rightSideEmpty={true} />} />)
        }
        <Route path='*' element={<Header closeMenu={closeMenu} openMenu={openMenu} showMenu={menuVisible} />} />
      </Routes>
      <div className={styles.contentContainer}>
        {
          showMenu ? <MobileMenu visible={menuVisible} /> : null
        }
        <Routes>
          <Route path='/' element={<PageWrapper />}>
            <Route index element={<HomeSection />} />
            <Route path='/settings' element={<SettingsSection />} />
            <Route path='/profiles/:profileId' element={<ProfileSection />} />
            <Route path='/posts/:postId' element={<PostSection />} />
            <Route path='/messages' element={<MessagesSection />} />
            <Route path='/people' element={<PeopleSection />} />
            <Route path='/messages' element={<MessagesWrapper />}>
              <Route index element={null} />
              <Route path='/messages/:userId' element={<MessagesRoom />} />
            </Route>
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

  // ****************************

  function manageShowMenuChange() {
    if (showMenu) {
      document.body.style.overflowY = 'hidden'
      setMenuVisible(true)
    }
    else {
      document.body.style.overflowY = 'auto'
    }
  }

  function managePageChange() {
    closeMenu()
    console.log('page change')
    document.getElementById('root')!.scrollTo(0, 0)
  }

  function openMenu() {
    setShowMenu(true)
  }

  function closeMenu() {
    setMenuVisible(false)
    sleep(200).then(() => setShowMenu(false))
  }
}

export default App