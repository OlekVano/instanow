import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  defaultValue?: string
}

export default function Textarea({ placeholder='', defaultValue='' }: Props) {
  return (
    <textarea className={styles.main} defaultValue={defaultValue} placeholder={placeholder} />
  )
}
