import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  highlighted?: boolean,
  text: string,
  func: Function
}

export default function AuthButton({ highlighted=false, text, func } : Props) {
  return (
    <div onClick={func as MouseEventHandler} className={styles.main}><div className={`${styles.text} ${highlighted ? styles.highlighted : ''}`}>{text}</div></div>
  )
}
