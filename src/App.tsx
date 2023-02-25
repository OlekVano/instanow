import Header from './components/Header'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginSignUpWrapper from './components/LoginSignUpWrapper'
import LoginMenu from './components/LoginMenu'
import SignUpMenu from './components/SignUpMenu'
import { auth } from '../firebase-setup'
import { useEffect, useState } from 'react'
import PageWrapper from './components/PageWrapper'
import Settings from './components/Settings'
import { getProfileById } from './utils'
import { Profile } from './types'
import styles from './App.module.scss'
import { ConfigProvider } from './UserContext'

function App() {
  const [currProfile, setCurrProfile] = useState<Profile | undefined>(undefined)
  const [currUser] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(manageAccountChange, [currUser])

  return (
    <ConfigProvider>
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
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  )

  // **********************************

  function manageAccountChange() {
    if (!currUser) return
    getProfileById(currUser.uid, currUser).then(function afterGotProfile(profile) {
      if (!profile) navigate('/settings')
      else setCurrProfile(profile)
    })
  }
}

export default App
