import styles from './index.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import background from '../../assets/login-sign-up-background.jpg'
import LoginSignUpLink from '../AuthLink'

export default function LoginSignUpWrapper() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <img src={background} className={styles.background} />
      <div className={`${styles.content} container-xl`}>
        <div className={styles.text}>Meet and get to know new amazing people</div>
        <div className={styles.menuWrapper}>
          <div className={styles.links}>
            <div className={styles.linkWrapper}><LoginSignUpLink func={function navigateToLogin() {navigate('/login')}} text='Login' highlighted={location.pathname === '/login'} /></div>
            <div className={styles.linkWrapper}><LoginSignUpLink func={function navigateToSignUp() {navigate('/sign-up')}} text='Sign Up' highlighted={location.pathname === '/sign-up'} /></div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
