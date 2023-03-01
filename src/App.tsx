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
import { getProfileById } from './utils'
import { Profile } from './types'
import styles from './App.module.scss'
import { UserContext } from './user-context'
import ProfileSection from './components/ProfileSection'
import CreatePostModal from './components/CreatePostModal'
import { ShareModalContext } from './share-modal-context'
import PostSection from './components/PostSection'

function App() {
  const [currProfile, setCurrProfile] = useState<Profile | undefined>()
  const [currUser] = useAuthState(auth)
  const [showShareModal, setShowShareModal] = useState(false)

  const navigate = useNavigate()

  useEffect(manageAccountChange, [currUser])

  return (
    <UserContext.Provider value={{
      currProfile: currProfile,
      currUser: currUser,
      setCurrProfile: setCurrProfile
    }}>
    <ShareModalContext.Provider value={{
      closeModal: closeShareModal,
      openModal: openShareModal
    }}>
      {
        !showShareModal ? null :
        <CreatePostModal />
      }
      <Routes>
        {
          ['/login', '/sign-up'].map((path: string, i: number) => <Route path={path} key={i} element={<Header rightSideEmpty={true} />} />)
        }
        <Route path='*' element={<Header />} />
      </Routes>
      <div className={styles.contentContainer}>
        <Routes>
          <Route index element={<div>IndexPage</div>} />
          <Route path='/' element={<LoginSignUpWrapper />}>
            <Route path='/login' element={<LoginMenu />} />
            <Route path='/sign-up' element={<SignUpMenu />} />
          </Route>
          <Route path='/' element={<PageWrapper />}>
            <Route path='/settings' element={<SettingsSection />} />
            <Route path='/profiles/:profileId' element={<ProfileSection />} />
            <Route path='/posts/:postId' element={<PostSection />} />
          </Route>
        </Routes>
      </div>
    </ShareModalContext.Provider>
    </UserContext.Provider>
  )

  // **********************************

  function manageAccountChange() {
    if (!currUser) return
    getProfileById(currUser.uid, currUser).then(function afterGotProfile(profile) {
      if (!profile) navigate('/settings')
      else setCurrProfile(profile)
    })
  }

  function openShareModal() {
    setShowShareModal(true)
  }

  function closeShareModal() {
    setShowShareModal(false)
  }
}

export default App
