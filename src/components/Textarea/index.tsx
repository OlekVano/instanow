import { ChangeEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  placeholder?: string,
  value?: string,
  func: Function
}

export default function Textarea({ placeholder='', value='', func=function(){} }: Props) {
  return (
    <textarea className={styles.main} value={value} placeholder={placeholder} onChange={func as ChangeEventHandler<HTMLTextAreaElement>} />
  )
}
