import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  defaultValue?: string
}

export default function Input({ placeholder='', defaultValue='' }: Props) {
  return (
    <input className={styles.main} type='text' defaultValue={defaultValue} placeholder={placeholder} />
  )
}
