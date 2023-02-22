import Header from './components/Header'
import LeftColumn from './components/LeftColumn'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import LoginSignUpPage from './pages/LoginSignUpPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          ['/login', '/sign-up'].map((path: string, i: number) => <Route path={path} key={i} element={<Header rightSideEmpty={true} />} />)
        }
        <Route path='*' element={<Header />} />
      </Routes>
      <Routes>
        <Route index element={<div>Index</div>} />
        <Route path='/' element={<div>Background<Outlet /></div>}>
          <Route path='/login' element={<div>Login</div>} />
          <Route path='/sign-up' element={<div>Sign UP</div>} />
        </Route>
        <Route path='/' element={<div>Columns<Outlet /></div>}>
          <Route path='/messages' element={<div>Messages</div>} />
          <Route path='/profile' element={<div>Profile</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
