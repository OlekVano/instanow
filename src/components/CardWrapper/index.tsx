import { PropsWithChildren } from 'react'
import styles from './index.module.scss'

export default function CardWrapper(props: PropsWithChildren) {
  return (
    <div className={styles.main}>
      {props.children}
    </div>
  )
}
