import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  type?: number,
  width?: string,
  text?: string,
  func?: Function
}

export default function Button({type=1, text='', width='auto', func=function(){}}: Props) {
  return (
    <div role='button' style={{width: width}} className={`${styles.main} ${type === 1 ? styles.typeOne : type === 2 ? styles.typeTwo : ''}`} onClick={func as MouseEventHandler}>{text}</div>
  )
}
