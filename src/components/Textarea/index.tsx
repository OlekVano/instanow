import { ChangeEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  defaultValue?: string,
  value?: string,
  func: Function
}

export default function Textarea({ placeholder='', defaultValue='', value=defaultValue, func=function(){} }: Props) {
  return (
    <textarea className={styles.main} defaultValue={defaultValue} value={value} placeholder={placeholder} onChange={func as ChangeEventHandler<HTMLTextAreaElement>} />
  )
}
