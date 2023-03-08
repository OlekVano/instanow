import styles from './index.module.scss'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

export default function NotLoggedInSection() {
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.text}>Only logged in users can use this website</div>
        <Button text='Login' func={redirrectToLoginPage} />
      </div>
    </div>
  )

  // ***************************

  function redirrectToLoginPage() {
    navigate('/login')
  }
}
