import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  image: string,
  text: string,
  selected: boolean,
  roundedTop?: boolean,
  func: Function
}

export default function NavButton({ image, text, selected, roundedTop=false, func=function(){} }: Props) {
  return (
    <div className={`${styles.main} ${selected ? styles.selected : ''} ${roundedTop ? styles.roundedTop : ''}`} onClick={func as MouseEventHandler}>
      <img src={image} className={styles.image} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}