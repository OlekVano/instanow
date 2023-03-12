import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  image: string,
  text: string,
  selected: boolean,
  func: Function,
  disabled?: boolean
}

export default function NavButton({ image, text, selected, func=function(){}, disabled=false }: Props) {
  return (
    <div className={`${styles.main} ${selected ? styles.selected : ''}`} onClick={disabled ? undefined : func as MouseEventHandler}>
      <img src={image} className={styles.image} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}