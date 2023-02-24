import styles from './index.module.scss'

type Props = {
  text: string,
  type?: number
}

export default function Circle({ type=1, text }: Props) {
  return (
    <div className={`${styles.main} ${type === 1 ? styles.typeOne : type === 2 ? styles.typeTwo : ''}`}>
      <div>{text}</div>
    </div>
  )
}
