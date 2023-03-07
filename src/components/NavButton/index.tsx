import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  image: string,
  text: string,
  selected: boolean,
  func: Function
}

export default function NavButton({ image, text, selected, func=function(){} }: Props) {
  return (
    <div className={`${styles.main} ${selected ? styles.selected : ''}`} onClick={func as MouseEventHandler}>
      <img src={image} className={styles.image} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}