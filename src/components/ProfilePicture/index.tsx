import styles from './index.module.scss'
import avatar from '../../assets/laura.png'

export default function ProfilePicture() {
  return (
    <img className={styles.main} src={avatar} />
  )
}
