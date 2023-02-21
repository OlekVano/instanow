import styles from './index.module.scss'
import Logo from '../Logo'

export default function LogoWithBrand() {
  return (
    <div className={styles.main}>
      <Logo />
      <span className={styles.brand}>Instanow</span>
    </div>
  )
}