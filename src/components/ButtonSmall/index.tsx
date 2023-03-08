import { MouseEventHandler } from 'react'
import styles from './index.module.scss'

type Props = {
  image: string,
  func?: Function,
  type?: 1 | 2
}

export default function ButtonSmall({ type=1, image, func=function(){} }: Props) {
  return (
    <div role='button' className={`${styles.main} ${type === 1 ? styles.typeOne : styles.typeTwo}`} onClick={func as MouseEventHandler}><img className={styles.image} src={image} /></div>
  )
}
