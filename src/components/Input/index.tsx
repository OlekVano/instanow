import { ChangeEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  value?: string,
  func?: Function
}

export default function Input({ placeholder='', value='', func=function(){} }: Props) {
  return (
    <input className={styles.main} type='text' value={value} placeholder={placeholder} onChange={func as ChangeEventHandler<HTMLInputElement>} />
  )
}
