import ProfilePicture from '../ProfilePicture'
import styles from './index.module.scss'

type Props = {
  src?: string
}

export default function ProfileMedium({ src='' }: Props) {
  return (
    <div className={styles.main}>
      <ProfilePicture size='md' src={src} />
      <div className={styles.nameAndTagContainer}>
        <div className={styles.name}>Laura Fitscher</div>
        <div className={styles.tag}>@laurafitscher</div>
      </div>
    </div>
  )
}
