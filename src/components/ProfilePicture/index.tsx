import styles from './index.module.scss'
import defaultProfile from '../../assets/profile.png'

type Props = {
  size: 's' | 'md' | 'lg' | 'xl' | 'xxl',
  src?: string
}

export default function ProfilePicture({ size, src=undefined }: Props) {
  return (
    <img className={`${styles.main} ${styles[size]}`} src={src ? src : defaultProfile} style={{filter: src ? '' : 'invert(68%) sepia(13%) saturate(334%) hue-rotate(176deg) brightness(101%) contrast(87%)'}} />
  )
}
