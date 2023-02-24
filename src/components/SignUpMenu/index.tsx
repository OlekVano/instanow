import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../utils'
import Input from '../Input'
import Button from '../Button'
import styles from './index.module.scss'

export default function SignUpMenu() {
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <Input placeholder='Email Address' />
      <Input placeholder='Password' />
      <Input placeholder='Repeat password' />
      <div className={styles.buttonsContainer}>
        <Button text='Sign up' />
        <div>or</div>
        <Button type={2} text='Sign up with Google' func={signUpWithGoogle} />
      </div>
    </div>
  )

  // ********************************

  function signUpWithGoogle() {
    signInWithGoogle(function navigateToHome() {navigate('/')})
  }
}
