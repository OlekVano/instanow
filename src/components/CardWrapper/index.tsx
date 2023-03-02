import { CSSProperties, PropsWithChildren } from 'react'
import styles from './index.module.scss'

type Props = {
  style?: CSSProperties
}

export default function CardWrapper(props: PropsWithChildren & Props) {
  return (
    <div className={styles.main} style={props.style}>
      {props.children}
    </div>
  )
}
