import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  type?: number,
  text?: string,
  func?: Function
}

export default function Button({type=1, text='', func=function(){}}: Props) {
  return (
    <div role='button' className={`${styles.main} ${type === 1 ? styles.typeOne : ''}`} onClick={func as MouseEventHandler}>{text}</div>
  )
}
