import AuthInput from '../AuthInput'
import Button from '../Button'
import styles from './index.module.scss'

export default function SignUpMenu() {
  return (
    <div className={styles.main}>
      <AuthInput placeholder='Email Address' />
      <AuthInput placeholder='Password' />
      <AuthInput placeholder='Repeat password' />
      <div className={styles.buttonsContainer}>
        <Button text='Sign up' />
        <div>or</div>
        <Button type={2} text='Sign up with Google' />
      </div>
    </div>
  )
}
