import styles from './index.module.scss'
import avatar from '../../assets/laura.png'

type Props = {
  size: 's' | 'md' | 'lg' | 'xl'
}

export default function ProfilePicture({ size }: Props) {
  return (
    <img className={`${styles.main} ${styles[size]}`} src={avatar} />
  )
}
