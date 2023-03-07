import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  text: string,
  func?: Function 
}

export default function TextButton({ text, func=function(){} }: Props) {
  return (
    <div role='button' onClick={func as MouseEventHandler} className={styles.main}>{text}</div>
  )
}
