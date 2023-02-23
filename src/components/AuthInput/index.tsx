import styles from './index.module.scss'

type Props = {
  placeholder?: string
}

export default function AuthInput({ placeholder='' }: Props) {
  return (
    <input className={styles.main} type='text' placeholder={placeholder} />
  )
}
