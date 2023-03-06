import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  value?: string,
  func?: Function,
  type?: HTMLInputTypeAttribute
}

export default function Input({ type='text', placeholder='', value='', func=function(){} }: Props) {
  return (
    <input className={styles.main} type={type} value={value} placeholder={placeholder} onChange={func as ChangeEventHandler<HTMLInputElement>} />
  )
}
