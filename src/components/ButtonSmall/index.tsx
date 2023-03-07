import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  image: string,
  func?: Function
}

export default function ButtonSmall({ image, func=function(){} }: Props) {
  return (
    <div role='button' className={styles.main} onClick={func as MouseEventHandler}><img className={styles.image} src={image} /></div>
  )
}
