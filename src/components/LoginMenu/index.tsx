import AuthInput from '../AuthInput'
import Button from '../Button'
import styles from './index.module.scss'

export default function LoginMenu() {
  return (
    <div className={styles.main}>
      <AuthInput placeholder='Email Address' />
      <AuthInput placeholder='Password' />
      <div className={styles.buttonsContainer}>
        <Button text='Login' />
        <div>or</div>
        <Button type={2} text='Login with Google' />
      </div>
    </div>
  )
}
