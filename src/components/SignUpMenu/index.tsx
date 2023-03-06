import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../utils'
import Input from '../Input'
import Button from '../Button'
import styles from './index.module.scss'
import { ChangeEvent, useState } from 'react'
import { auth } from '../../../firebase-setup'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function SignUpMenu() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <Input placeholder='Email Address' value={email} func={manageEmailInput} />
      <Input type='password' placeholder='Password' value={password} func={managePasswordInput} />
      <Input type='password' placeholder='Repeat password' value={password2} func={managePasswordInput2} />
      <div className={styles.buttonsContainer}>
        <Button text='Sign up' func={createEmailAccount} />
        <div>or</div>
        <Button type={2} text='Sign up with Google' func={signUpWithGoogle} />
      </div>
    </div>
  )

  // ********************************

  function manageEmailInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim())
  }

  function managePasswordInput(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value.trim())
  }

  function managePasswordInput2(e: ChangeEvent<HTMLInputElement>) {
    setPassword2(e.target.value.trim())
  }

  function createEmailAccount() {
    if (!validatePassword(password)) return
    if (password !== password2) {
      alert('Passwords don\'t match.')
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('Email already in use.')
      }
    })
  }

  function validatePassword(str: string) {
    if (str.length < 8) {
      alert('Password must contain at least 8 characters')
      return false
    }
    if (!str.match(/^[\w.-]+$/)) {
      alert('Password can only contain letters, characters, dots, dashes and underscores.')
      return false
    }
    return true
  }

  function signUpWithGoogle() {
    signInWithGoogle(function navigateToHome() {navigate('/')})
  }
}
