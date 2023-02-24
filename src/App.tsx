import Header from './components/Header'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginSignUpWrapper from './pages/LoginSignUpWrapper'
import LoginMenu from './components/LoginMenu'
import SignUpMenu from './components/SignUpMenu'
import { auth } from '../firebase-setup'
import { useEffect } from 'react'
import PageWrapper from './pages/PageWrapper'
import Settings from './pages/Settings'

function App() {
  const [currUser] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(manageCreateAccount, [currUser])

  return (
    <>
      <Routes>
        {
          ['/login', '/sign-up'].map((path: string, i: number) => <Route path={path} key={i} element={<Header rightSideEmpty={true} />} />)
        }
        <Route path='*' element={<Header />} />
      </Routes>
      <div style={{paddingTop: '120px', height: '100%'}}>
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

      {/* <Routes>
        <Route index element={<div>Index</div>} />
        //
        <Route path='/' element={<div>Background<Outlet /></div>}>
          <Route path='/login' element={<div>Login</div>} />
          <Route path='/sign-up' element={<div>Sign UP</div>} />
        </Route>
        <Route path='/' element={<div>Columns<Outlet /></div>}>
          <Route path='/messages' element={<div>Messages</div>} />
          <Route path='/profile' element={<div>Profile</div>} />
        </Route>
      </Routes> */}
    </>
  )

  // **********************************

  function manageCreateAccount() {
    if (!currUser?.uid) return
    
  }

}

export default App
