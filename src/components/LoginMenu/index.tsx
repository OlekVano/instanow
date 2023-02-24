import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../utils'
import Input from '../Input'
import Button from '../Button'
import styles from './index.module.scss'

export default function LoginMenu() {
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <Input placeholder='Email Address' />
      <Input placeholder='Password' />
      <div className={styles.buttonsContainer}>
        <Button text='Login' />
        <div>or</div>
        <Button type={2} text='Login with Google' func={loginWithGoogle} />
      </div>
    </div>
  )

  // ***********************************

  function loginWithGoogle() {
    signInWithGoogle(function navigateToHome() {navigate('/')})
  }
}
