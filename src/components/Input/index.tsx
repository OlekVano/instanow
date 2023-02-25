import { ChangeEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  defaultValue?: string,
  value?: string,
  func?: Function
}

export default function Input({ placeholder='', defaultValue='', value=defaultValue, func=function(){} }: Props) {
  return (
    <input className={styles.main} type='text' defaultValue={defaultValue} value={value} placeholder={placeholder} onChange={func as ChangeEventHandler<HTMLInputElement>} />
  )
}
