import { Link } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  highlighted?: boolean,
  text: string,
  path: string
}

export default function AuthLink({ highlighted=false, text, path } : Props) {
  return (
    <Link to={path} className={styles.main}><div className={`${styles.text} ${highlighted ? styles.highlighted : ''}`}>{text}</div></Link>
  )
}
