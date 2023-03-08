import styles from './index.module.scss'
import defaultProfile from '../../assets/user.png'

type Props = {
  size: 's' | 'md' | 'lg' | 'xl' | 'xxl',
  src?: string
}

export default function ProfilePicture({ size, src=undefined }: Props) {
  return (
    <img className={`${styles.main} ${styles[size]}`} src={src ? src : defaultProfile} style={{filter: src ? '' : 'brightness(120%)'}} />
  )
}
