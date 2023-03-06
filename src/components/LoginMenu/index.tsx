import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../utils'
import Input from '../Input'
import Button from '../Button'
import styles from './index.module.scss'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { auth } from '../../../firebase-setup'

export default function LoginMenu() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.main}>
      <Input placeholder='Email Address' value={email} func={manageEmailInput} />
      <Input type='password' placeholder='Password' value={password} func={managePasswordInput} />
      <div className={styles.buttonsContainer}>
        <Button text='Login' func={loginWithEmail} />
        <div>or</div>
        <Button type={2} text='Login with Google' func={loginWithGoogle} />
      </div>
    </div>
  )

  // ***********************************

  function manageEmailInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim())
  }

  function managePasswordInput(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value.trim())
  }

  function loginWithEmail() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/')
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  function loginWithGoogle() {
    signInWithGoogle(function navigateToHome() {navigate('/')})
  }
}
